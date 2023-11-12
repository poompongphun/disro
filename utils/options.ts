import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '@/utils/axios';

export const options: NextAuthOptions = {
    providers: [
        // Providers...
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // const login = await axios.post('/admins/sign-in', credentials);
                // const getData = await axios.get('/admins/me', {
                //     headers: { Authorization: `Bearer ${login.data.data}` },
                // });

                // If no error and we have user data, return it
                // console.log(credentials);
                // {
                //     email: 'test@gmail.com',
                //     password: 'test@gmail.com',
                //     redirect: 'true',
                //     callbackUrl: '/',
                //     csrfToken: 'f6b8ff111d9c3993980ddbf6ae843009719e7a740ba3ae67a3e1b3cb7b6131c4',
                //     json: 'true'
                //   }
                // console.log(credentials);

                const getUsers = await axios.get('/user-service/users');
                const allUser = getUsers.data
                const findUser = allUser.find((user: any) => {
                    return user.email == credentials?.email && user.password == credentials?.password
                })
                // {
                //     _id: '65507b08bbcb1e4a1ca490fe',
                //     email: 'test@gmail.com',
                //     username: 'test',
                //     phone: '12345',
                //     password: '12345',
                //     birthdate: '2023-11-15'
                //   }

                if (findUser) {
                    return findUser as any;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) token = { ...token, ...user };
            return token;
        },
        session: ({ session, token }) => {
            session.user = token;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
};
