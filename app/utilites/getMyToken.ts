'use server'
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

interface DecodedToken {
  token: string
  user: {
    name: string
    email: string
    role: string
  }
  id?: string
  sub?: string
}

export default async function getMyToken() {
  let decodedToken = (await cookies()).get('next-auth.session-token')?.value
  let token = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! }) as DecodedToken | null

  return token?.token
}

export async function getUserId() {
  let decodedToken = (await cookies()).get('next-auth.session-token')?.value
  let token = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! }) as DecodedToken | null

  return token?.sub
}
