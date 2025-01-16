'use-client'
import { ReactElement, useContext } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { AuthContext } from "@/pages/_app";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type HeaderProps = {
    handleLogout: (event: React.MouseEvent) => void

}

export const Header: React.FC<HeaderProps> = ({ handleLogout }): ReactElement => {
    const auth = useContext(AuthContext)

    return (
        <header className="bg-white shadow-md h-[75px] flex items-center px-10 justify-between">
            <div className="flex items-center space-x-4">
                <Logo />

            </div>
            <nav className="flex items-center space-x-6 px-10">
                {auth?.isAuthenticated
                    &&
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger>Olá, {auth?.user?.name}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={"/"}>
                                        Crie sua frase
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/frases/pagina/1"}>
                                        Suas frases
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator>
                                </DropdownMenuSeparator>
                                <DropdownMenuItem>
                                    <button onClick={handleLogout}>
                                        Sair
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </>
                }
            </nav>
        </header>
    );
};
