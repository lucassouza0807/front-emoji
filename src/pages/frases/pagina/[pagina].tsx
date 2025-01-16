import { ReactElement, createContext, useEffect } from "react";
import { Phrases } from "@/components/phrase/Phrases";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { useRedirectCaseUserIsNotAuthenticated } from "@/hooks/useAuth";

export const PhraseContext = createContext<any | null>(null)

type PhraseType = {
    emojified_phrase?: string
    original_phrase?: string
}

export default function Frase(): ReactElement {
    const [phrases, setPhrases] = useState<any>()
    const [totalPages, setTotalPages] = useState<number>()
    const [currentPage, setCurrentPage] = useState<number>(1)

    const router = useRouter()

    const { pagina } = router.query

    const fetchData = async (): Promise<void> => {
        try {
            const url: string = `${process.env.NEXT_PUBLIC_API_URL}v1/phrases?page=${pagina}`

            const request = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("userToken")}`
                }
            })

            setPhrases(request.data.data)
            setCurrentPage(request.data.current_page)
            setTotalPages(request.data.last_page)

        } catch (err: any) {
            console.log(err)
        }

    }

    const handlePageMutation = async (): Promise<void> => {
        if (phrases && totalPages && phrases.length == 0) {
            if (currentPage > totalPages) {
                router.push({
                    pathname: "/frases/pagina/[pagina]",
                    query: {
                        pagina: totalPages
                    }
                })

                return
            }

            if (currentPage !== 1) {
                router.push({
                    pathname: "/frases/pagina/[pagina]",
                    query: {
                        pagina: currentPage - 1
                    }
                })

                return
            }

            if (currentPage == 1) {
                await fetchData()
                router.push({
                    pathname: "/frases/pagina/[pagina]",
                    query: {
                        pagina: 1
                    }
                })

                return
            }

        }
    }

    useEffect(() => {
        handlePageMutation()
    }, [phrases])


    useEffect(() => {
        fetchData()
    }, [router.query.pagina])

    return (
        <PhraseContext.Provider
            value={{
                phrases,
                setPhrases,
                currentPage,
                setCurrentPage,
                totalPages,
                setTotalPages,
                fetchData
            }}
        >
            <Head>
                <title>Frases</title>
            </Head>
            <Phrases />
        </PhraseContext.Provider>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return useRedirectCaseUserIsNotAuthenticated(context)
}