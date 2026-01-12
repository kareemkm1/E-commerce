import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;

    // Try default token retrieval
    let token = await getToken({ req: request, secret });

    // Fallback: try common cookie names if token wasn't found (handles secure vs non-secure cookie differences)
    if (!token) {
        const fallbackNames = ['next-auth.session-token', '__Secure-next-auth.session-token'];
        for (const cookieName of fallbackNames) {
            token = await getToken({ req: request, secret, cookieName });
            if (token) break;
        }
    }

    if (token) return NextResponse.next();

    const loginUrl = new URL('/login', request.url);
    const callback = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set('callbackUrl', callback);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/checkout/:path*'],
};