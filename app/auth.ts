import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },

    providers: [
        credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                let response = await fetch(`${process.env.API}/api/v1/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: { 'content-type': 'application/json' }
                })


                let payload = await response.json();

                const decoded: { id: string } = jwtDecode(payload.token);

                if (payload.message === "success") {
                    return {
                        id: decoded.id,
                        user: payload.user,
                        token: payload.token
                    }
                }

                return null;



                // return payload ; 
                // throw new Error('');
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user?.user
                token.token = user?.token
            }

            return token

        },

     async session({ session, token }) {

            session.user = token.user as {
                name:string,
                email:string,
                role:string
            }

            return session
        },
    }
}