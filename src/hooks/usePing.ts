
import axios from "axios";

export const isServerOk = async (): Promise<boolean> => {
    try {
        const main_app = axios.get(`${process.env.NEXT_PUBLIC_API_URL}ping`);
        const emoji_api = axios.get(`${process.env.NEXT_PUBLIC_EMOJI_API}ping`);

        await Promise.all([main_app, emoji_api]);

        return true;
        
    } catch (error: any) {
        console.error(error)
        return false;
    }
};
