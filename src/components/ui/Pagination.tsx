import { ReactElement } from "react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    handlePage: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePage }): ReactElement => {
    const getPaginationPages = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPaginationPages();

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 py-4">
            <button
                id="prev-page"
                className="font-bold rounded-md border border-purple-300 py-2 px-4 text-sm text-purple-600 bg-white transition-all shadow-md 
                   hover:bg-purple-600 hover:text-white hover:shadow-lg 
                   focus:bg-purple-700 focus:border-purple-700 focus:text-white 
                   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                disabled={currentPage == 1}
                onClick={(event) => handlePage(event, currentPage - 1)}
            >
                Anterior
            </button>
            {pages.map((page, index) => (
                <button
                    id={`page-${index + 1}`}
                    key={`page-${index + 1}`}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        if (page !== "...") handlePage(event, Number(page));
                    }}
                    className={`rounded-md py-2 px-4 border text-sm transition-all shadow-md 
                      ${page == currentPage
                            ? "bg-purple-600 text-white border-purple-600"
                            : page === "..."
                                ? "pointer-events-none opacity-50"
                                : "bg-white text-purple-600 border-purple-300 hover:bg-purple-500 hover:text-white"
                        } 
                      focus:bg-purple-700 focus:border-purple-700 focus:text-white`}
                >
                    {page}
                </button>
            ))}
            <button
                id="next-page"
                className="font-bold rounded-md border border-purple-300 py-2 px-4 text-sm text-purple-600 bg-white transition-all shadow-md 
                   hover:bg-purple-600 hover:text-white hover:shadow-lg 
                   focus:bg-purple-700 focus:border-purple-700 focus:text-white 
                   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                disabled={currentPage == totalPages}
                onClick={(event) => handlePage(event, Number(currentPage) + 1)}
            >
                Próximo
            </button>
        </div>
    );
};
