import { ReactElement, useContext, useRef, useState } from "react";
import { Input } from "../ui/input";
import Cookies from "js-cookie";
import axios from "axios";
import { PhraseContext } from "@/pages/frases/pagina/[pagina]";
import { useRouter } from "next/router";

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

export const SearchPhrase = (): ReactElement => {
    const { setPhrases, setTotalPages, currentPage, setCurrentPage } = useContext(PhraseContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>()

    const router = useRouter();

    const fetchPhrases = async (value: string): Promise<void> => {
        try {
            setLoading(true);

            // Redireciona para a primeira página, se necessário
            if (currentPage !== 1) {
                router.push({
                    pathname: "/frases/pagina/[pagina]",
                    query: { pagina: 1 },
                });
            }

            const url: string = `${process.env.NEXT_PUBLIC_API_URL}v1/search-phrase?query=${value}`;

            const results = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("userToken")}`,
                },
            });

            const { data, current_page, last_page } = results.data;

            setCurrentPage(current_page);
            setPhrases(data);
            setTotalPages(last_page);
        } catch (error: any) {
            console.error(error);
            alert("Erro ao buscar frases. Por favor, tente novamente.");

        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchPhrases = useRef(debounce(fetchPhrases, 300)).current;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        debouncedFetchPhrases(value);
    };

    return (
        <div className="relative">
            <form action="">
                <div className="w-full max-w-xs text-black">
                    <Input
                        type="text"
                        placeholder="Procurar frase"
                        onChange={handleChange}
                       
                    />
                </div>
            </form>
            {loading && <p className="text-sm text-gray-500 absolute top-full mt-2">Carregando...</p>}
        </div>
    );
};
