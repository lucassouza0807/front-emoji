import { Header } from "@/components/ui/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, createContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isServerOk } from "@/hooks/usePing";
import { BackEndError } from "@/components/errors/BackEndError";
import Head from "next/head";

type UserProps = {
  id: number
  name: string,
  email: string
}

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: UserProps | null
  setUser: (user: UserProps | null) => void
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [serverIsOk, setServerIsOk] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<UserProps | null>(null)

  const handleLogout = (event: React.MouseEvent): void => {
    event.preventDefault();

    Cookies.remove("userToken");
    Cookies.remove("is_authenticated")
    Cookies.remove("user")

    setIsAuthenticated(false);
    router.push("/login");
  };

  const checkServer = async (): Promise<void> => {
    const serverIsOk = await isServerOk()
    setServerIsOk(serverIsOk)

  }

  useEffect(() => {
    checkServer()
    if (Cookies.get("userToken") && Cookies.get("user")) {
      setIsAuthenticated(true)
      setUser(JSON.parse(String(Cookies.get("user"))))
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser
      }}>
      {serverIsOk
        ?
        <>
          <main>
            <div>
              <Header handleLogout={handleLogout} />
              <Component {...pageProps} />
            </div>
          </main>
        </>
        :
        <>
        <Head>
          <title>Emojify.io</title>
        </Head>
          <BackEndError />
        </>
      }
    </AuthContext.Provider>
  );
}
