import { emojifyPhrase } from "@/hooks/usePhrase";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import { ReactElement, useRef, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

export const Emojify = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMesage] = useState<string>()

    const phraseRef = useRef<HTMLTextAreaElement>(null)

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        try {
            event.preventDefault()
            setIsLoading(true)

            const storeApiUrl: string = `${process.env.NEXT_PUBLIC_API_URL}v1/store-phrase`
            const phrase: string = String(phraseRef.current?.value)

            const { original_phrase, emojified_phrase } = await emojifyPhrase(phrase)

            await axios.post(storeApiUrl, {
                original_phrase: original_phrase,
                emojified_phrase: emojified_phrase,
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("userToken")}`
                }
            })

            router.push("/frases/pagina/1")

        } catch (err) {
            setErrorMesage("😧😧Oops.. houve um erro ao traduzir sua frase em emoji!")
            setIsLoading(false)
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4 w-full"
        >
            <textarea
                ref={phraseRef}
                className="w-full bg-gray-100 border-2 border-gray-300 max-w-3xl h-[100px] p-4 rounded-lg text-gray-800 font-medium text-base placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-purple-300"
                id="phrase"
                placeholder="Digite sua frase aqui..."
                required
            />
            {errorMessage && <p className="font-bold text-red-500">{errorMessage}</p>}
            <button
                id="emojify-button"
                type="submit"
                disabled={isLoading}
                className={`h-14 w-[90%] max-w-md bg-purple-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
                {isLoading ? (
                    <Image
                        src="/loading-white.svg"
                        alt="Carregando..."
                        width={30}
                        height={30}
                        className="animate-spin mx-auto"
                    />
                ) : (
                    "Traduzir pra Emoji"
                )}
            </button>
        </form>
    )
}