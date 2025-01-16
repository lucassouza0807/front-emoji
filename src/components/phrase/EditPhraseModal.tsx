import { ReactElement, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { emojifyPhrase } from "@/hooks/usePhrase";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { PhraseContext } from "@/pages/frases/pagina/[pagina]";

type EditPhraseProps = {
    phrase_id: string;
    phrase: string,
    index: number
}


export const EditPhraseModal: React.FC<EditPhraseProps> = ({ phrase_id, phrase, index }): ReactElement => {
    const [open, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>()

    const { fetchData } = useContext(PhraseContext)

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleEdit = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        try {
            event.preventDefault()
            setIsLoading(true)

            const editPhraseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}v1/edit-phrase/${phrase_id}`
            const phrase: string = String(textareaRef.current?.value)

            const { original_phrase, emojified_phrase } = await emojifyPhrase(phrase)

            await axios.put(editPhraseUrl, {
                original_phrase: original_phrase,
                emojified_phrase: emojified_phrase,
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("userToken")}`
                }
            })

            await fetchData()

            setIsLoading(false)
            setIsOpen(false)

        } catch (err) {

            setIsLoading(false)
        }

    }


    return (
        <Dialog open={open} onOpenChange={() => setIsOpen(!open)}>
            <DialogTrigger asChild>
                <button
                    id={`edit-phrase-button-${index}`}
                    className="md:w-[100%] w-[50%] bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Editar Frase
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[100vw] md:max-w-[70vw] xl:max-w-[30vw]">
                <h2 className="text-xl font-semibold mb-4">Editar a frase</h2>
                <p className="mb-6 text-gray-600">Altere o conteúdo da frase abaixo:</p>
                <textarea
                    ref={textareaRef}
                    className="md:w-full bg-gray-100 border-2 border-gray-300 max-w-3xl md:h-[200px] p-4 rounded-lg text-gray-800 font-medium text-base placeholder-gray-500 resize-none focus:outline-none focus:ring-4 focus:ring-purple-300"
                    id="phrase-text-area"
                    placeholder="Digite sua frase aqui..."
                    required

                >
                    {phrase}
                </textarea>
                <DialogFooter>
                    <Button
                        disabled={isLoading}
                        className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition-all font-bold"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        id="save-changes-button"
                        onClick={handleEdit}
                        disabled={isLoading}
                        className="bg-blue-600 text-white hover:bg-blue-500 transition-all font-bold"
                    >
                        {isLoading ? (
                            <Image src="/loading-white.svg" width={35} height={35} alt="Loading spinner" />
                        ) : (
                            "Salvar Alterações"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}