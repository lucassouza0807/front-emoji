import { Emojify } from "@/components/emoji/Emojify";
import { ReactElement } from "react";
import { Greetings } from "@/components/Greetings";
import { GetServerSidePropsContext } from 'next';
import { useRedirectCaseUserIsNotAuthenticated } from "@/hooks/useAuth";
import Head from "next/head";

export default function Home(): ReactElement {
  return (
    <>
    <Head>
      <title>
        Tradutor de frases pra emoji
      </title>
    </Head>
      <div className="flex flex-col gap-3">
        <Greetings />
        <Emojify />
      </div>
    </>

  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return useRedirectCaseUserIsNotAuthenticated(context)
}