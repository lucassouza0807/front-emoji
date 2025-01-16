import * as cookie from 'cookie'
import { GetServerSidePropsContext } from 'next';

export const userRedirectCaseUserIsAuthenticated = (context: GetServerSidePropsContext, destination: string = "/") => {
    let parsedCookies: any = {};

    if (context.req.headers.cookie) {
        parsedCookies = cookie.parse(context.req.headers.cookie);
    }

    if (parsedCookies.userToken) {
        return {
            redirect: {
                permanent: false,
                destination: destination
            },
            props: {}
        }
    }

    return {
        props: {}
    }

}

export const useRedirectCaseUserIsNotAuthenticated = (context: GetServerSidePropsContext) => {
    let parsedCookies: any = {};

    if (context.req.headers.cookie) {
        parsedCookies = cookie.parse(context.req.headers.cookie);
    }

    if (!parsedCookies.userToken) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            },
            props: {}
        }
    }

    return {
        props: {}
    }

}