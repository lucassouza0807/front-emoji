import { ReactElement } from "react";
import Image from "next/image";

export const Logo = (): ReactElement => {
    return (
        <div className="flex flex-row">
            <Image src={"/logo.png"} width={150} height={150} alt="logo" />
        </div>
    )
}