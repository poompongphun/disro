import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

const ApiClient = () => {
    const defaultOptions = {
        baseURL,
    };

    const instance = axios.create(defaultOptions);

    // instance.interceptors.request.use(async (request) => {
    //     const session = await getSession();
    //     const user = session?.user as { token: string };
    //     if (session) {
    //         // console.log(`session`, session);
    //         request.headers.Authorization = `Bearer ${user?.token}`;
    //     }
    //     return request;
    // });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(`error`, error);
        },
    );

    return instance;
};

export default ApiClient();