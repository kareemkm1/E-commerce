/* eslint disapled */
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    user: {
      name: string,
      email: string,
      role: string,
    },
    token: string
  }
  interface Session {
    user: {
      name: string,
      email: string,
      role: string,
    }
  }

}
declare module "next-auth/jwt" {
  interface JWT extends User {
    idToken?: string
  }
}