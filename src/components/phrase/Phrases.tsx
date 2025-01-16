import { ReactElement, useContext, useEffect } from "react";
import { Pagination } from "../ui/Pagination";
import { PhraseContext } from "@/pages/frases/pagina/[pagina]";
import { useRouter } from "next/router";
import { Input } from "../ui/input";
import { DeletePhraseModal } from "./DeletePhraseModal";
import { EditPhraseModal } from "./EditPhraseModal";
import { SearchPhrase } from "./SearchPhrase";

export const Phrases = (): ReactElement => {
    const { phrases, totalPages, currentPage } = useContext(PhraseContext)

    const router = useRouter()

    const { pagina } = router.query

    const handlePage = (event: React.MouseEvent<HTMLButtonElement>, page: number): void => {
        if (pagina) {
            router.push({
                pathname: '/frases/pagina/[pagina]',
                query: {
                    pagina: page
                }
            })
        }
    }

    return (
        <div className="flex flex-col items-center w-full p-4">
            <div className="w-full lg:w-3/4 border border-gray-300 shadow-lg rounded-lg overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border-b w-1/10">
                                <SearchPhrase />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {phrases &&
                            phrases.map((item: any, index: number) => (
                                <tr
                                    key={`phrase-${index}`}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                >
                                    <td className="px-4 py-4 border-b flex flex-col md:flex-row gap-3 items-start md:items-center">
                                        <div className="w-full md:w-4/5">
                                            <p className="font-bold text-gray-700">Frase original:</p>
                                            <p className="mb-2">{item["original_phrase"]}</p>
                                            <hr className="my-2 border-gray-300" />
                                            <p className="font-bold text-gray-700">Frase Emojificada:</p>
                                            <p>{item["emojified_phrase"]}</p>
                                        </div>
                                        <div className="w-full md:w-1/5 flex md:flex-col flex-row items-center justify-center gap-2">
                                            <EditPhraseModal
                                                index={index}
                                                phrase_id={item["ID"]}
                                                phrase={item["original_phrase"]}
                                            />
                                            <DeletePhraseModal
                                                index={index}
                                                phrase_id={item["ID"]}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePage={handlePage}
            />
        </div>



    )

}