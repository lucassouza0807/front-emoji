import { Input } from "@/components/ui/input";
import axios from "axios";
import { ReactElement, useState } from "react";
import Cookies from "js-cookie"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { GetServerSidePropsContext } from 'next';
import { userRedirectCaseUserIsAuthenticated } from "@/hooks/useAuth";

type FormData = {
    name?: string
    email?: string
    password?: string
}

export default function Cadastro(): ReactElement {
    const [formData, setFormData] = useState<FormData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id: key, value } = e.target;
        setFormData({ ...formData, [key]: value });
    };

    const handleRegister = async (e: React.FormEvent): Promise<void> => {
        try {
            e.preventDefault();
            setErrorMessage("")
            setIsLoading(true);

            const url: string = `${process.env.NEXT_PUBLIC_API_URL}v1/create-user`

            const request = await axios.post(url, formData)

            const { data } = request

            if (data.token) {
                Cookies.set("userToken", data.token, { secure: true, expires: data.exp / 86400 })

                router.push("/")

                return
            }

            router.push("/login")

        } catch (err: any) {
            console.log(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }

            setIsLoading(false)
        }
    };

    
    return (
        <>
            <Head>
                <title>
                    Cadastre-se - emojify.io
                </title>
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-500 to-purple-700 text-white">
                <div className="w-[90%] max-w-lg bg-white text-gray-800 rounded-xl shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                        Crie sua Conta!
                    </h1>
                    <p className="text-center text-lg text-gray-600 mb-8">
                        Cadastre-se para começar 🚀
                    </p>
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nome
                            </label>
                            <Input
                                onChange={handleChange}
                                type="text"
                                id="name"
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>
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
                            <p className="text-red-500 font-bold">{errorMessage}</p>
                        }

                        <FormSubmitButton disabled={isLoading}>
                            {isLoading ? <img src="/loading-white.svg" width={30} height={30} alt="Loading spinner" /> : "Cadastrar"}
                        </FormSubmitButton>
                    </form>
                    <p className="text-center text-gray-600 mt-6">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="text-indigo-500 font-medium hover:underline">
                            Faça login aqui
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
    return userRedirectCaseUserIsAuthenticated(context)
}
