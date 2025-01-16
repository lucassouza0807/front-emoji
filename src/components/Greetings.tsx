import { ReactElement } from "react";

export function Greetings(): ReactElement {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] bg-gradient-to-b from-indigo-500 to-purple-700 text-white">
            <div className="w-[90%] max-w-4xl text-center p-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Traduza Texto para Emojis
                </h1>
                <p className="text-lg md:text-xl font-medium mb-8">
                    Descubra a magia da tradução instantânea! Converta suas palavras em
                    expressões cheias de emoções com o poder da IA. 🎉😃💬
                </p>
            </div>
        </div>

    )
}