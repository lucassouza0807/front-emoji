import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import Cookies from "js-cookie"
import React, { useContext, useState } from "react"
import Image from "next/image"
import { PhraseContext } from "@/pages/frases/pagina/[pagina]"

type PhraseDeleteProps = {
    phrase_id: number,
    index: number

}

export const DeletePhraseModal: React.FC<PhraseDeleteProps> = ({ phrase_id, index }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setIsOpen] = useState<boolean>(false)

    const { phrases, setPhrases } = useContext(PhraseContext)

    const handleDeletePhrase = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        try {
            event.preventDefault()
            setIsLoading(true)

            const url: string = `${process.env.NEXT_PUBLIC_API_URL}v1/delete-phrase/${phrase_id}`

            const request = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("userToken")}`
                }
            })

            setIsLoading(false)
            setIsOpen(false)

            setPhrases(() => {
                return phrases.filter((el: any) => el.ID != phrase_id)
            })


        } catch (error: any) {
            alert("Houve um erro ao excluír a frase.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={() => setIsOpen(!open)}>
            <DialogTrigger asChild>
                <button
                    id={`delete-button-${index}`}
                    className="md:w-[100%] w-[50%] bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    Excluir
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-red-600 font-bold text-lg">
                        Confirmar Exclusão
                    </DialogTitle>
                    <DialogDescription className="text-gray-700">
                        Você está prestes a excluir este item. Esta ação é <strong>irreversível</strong>. Tem certeza de que deseja continuar?<br />
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        disabled={isLoading}
                        className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition-all font-bold"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        id={`delete-button-confirmation-${index}`}
                        disabled={isLoading}
                        className="bg-red-600 text-white hover:bg-red-500 transition-all font-bold"
                        onClick={handleDeletePhrase}
                    >
                        {isLoading ? <Image src="loading-white.svg" width={50} height={50} alt="Loading spinner" /> : "Confirmar Exclusão"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
