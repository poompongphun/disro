import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
    async function middleware(req: NextRequest) {
        // Get the pathname of the request (e.g. /, /protected)
        const path = req.nextUrl.pathname;
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!session && path !== '/login' && path !== '/register') {
            return NextResponse.redirect(new URL('/login', req.url));
        } else if (session && (path === '/login' || path === '/register')) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            async authorized() {
                // This is a work-around for handling redirect on auth pages.
                // We return true here so that the middleware function above
                // is always called.
                return true;
            },
        },
    }
);

