import axios from "axios"

type EmojifiedPhrases = {
    original_phrase: string,
    emojified_phrase: string
}

export async function emojifyPhrase(phrase: string): Promise<EmojifiedPhrases> {
    try {
        const url: string = process.env.NEXT_PUBLIC_EMOJI_API + "emojify"

        const request = await axios.post(url, {
            phrase: phrase
        })

        const { original_phrase, emojified_phrase }: EmojifiedPhrases = request.data

        return { original_phrase, emojified_phrase }

    } catch (err: any) {
        if (axios.isAxiosError(err)) {
            throw new Error(`Erro na requisição: ${err.message}`);
            
        } else if (err instanceof Error) {

            throw new Error(`Erro inesperado: ${err.message}`);
        } else {
            throw new Error('Erro desconhecido');
        }
    }
}