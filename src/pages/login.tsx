import axios from "axios"
import { ReactElement, useState, ChangeEvent, useContext } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import { GetServerSidePropsContext } from 'next';
import { userRedirectCaseUserIsAuthenticated } from "@/hooks/useAuth"
import { AuthContext } from "./_app"
import { json } from "stream/consumers"

type FormData = {
    email?: string
    password?: string
}

export default function Login(): ReactElement {
    const [errorMessage, setErrorMessage] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData | null>(null)

    const auth = useContext(AuthContext)

    const router = useRouter()

    const handleLogin = async (event: React.FormEvent): Promise<void> => {
        try {
            event.preventDefault()

            setIsLoading(true)

            const url: string = `${process.env.NEXT_PUBLIC_API_URL}v1/login`

            const request = await axios.post(url, formData)

            const { data } = request

            const user = {
                id: data.user.ID,
                email: data.user.email,
                name: data.user.name
            }

            Cookies.set("userToken", data.token, { expires: data.exp / 86400 })
            Cookies.set("is_authenticated", "true", { expires: data.exp / 86400 })
            Cookies.set("user", JSON.stringify(user), { expires: data.exp / 86400 })

            auth?.setIsAuthenticated(true)
            auth?.setUser(user)

            setIsLoading(false)

            router.push("/")


        } catch (err: any) {
            if (err.response) {
                setErrorMessage(err.response.data.message)

                setIsLoading(false)
                return
            }

            setErrorMessage("Houve um erro tente tentar fazer login.")

            setIsLoading(false)

        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()

        const key: string = event.target.id
        const value: string = event.target.value

        setFormData((prevState: any) => ({
            ...prevState,
            [key]: value
        }))
    }

    return (
        <>
            <Head>
                <title>Login - emojify.io</title>
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-500 to-purple-700 text-white">
                <div className="w-[90%] max-w-lg bg-white text-gray-800 rounded-xl shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                        Bem-vindo de Volta!
                    </h1>
                    <p className="text-center text-lg text-gray-600 mb-8">
                        Faça login para continuar 🚀
                    </p>
                    <form id="login-form" className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <Input
                                onChange={handleChange}
                                type="email"
                                id="email"
                                placeholder="Digite seu email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>
                            <Input
                                onChange={handleChange}
                                type="password"
                                id="password"
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>
                        {errorMessage &&
                            <p className="error_message text-red-500 font-bold">{errorMessage}</p>
                        }
                        <FormSubmitButton disabled={isLoading}>
                            {isLoading ? <Image src={"/loading-white.svg"} width={30} height={30} alt="Loading spinner" /> : "Entrar"}
                        </FormSubmitButton>
                    </form>
                    <p className="text-center text-gray-600 mt-6">
                        Não tem uma conta?{' '}
                        <Link id="register-link" href="/cadastro" className="text-indigo-500 font-medium hover:underline">
                            Cadastre-se aqui
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return userRedirectCaseUserIsAuthenticated(context)
}