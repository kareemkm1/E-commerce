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
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  const possibleNames = [
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    '__Host-next-auth.session-token'
  ]

  let decodedToken = allCookies.find(c => possibleNames.includes(c.name))?.value
  if (!decodedToken) {
    decodedToken = allCookies.find(c => c.name.includes('next-auth.session-token'))?.value
  }

  if (!decodedToken) return null

  const token = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! }) as DecodedToken | null

  return token?.token ?? null
}

export async function getUserId() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  const possibleNames = [
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
    '__Host-next-auth.session-token'
  ]

  let decodedToken = allCookies.find(c => possibleNames.includes(c.name))?.value
  if (!decodedToken) {
    decodedToken = allCookies.find(c => c.name.includes('next-auth.session-token'))?.value
  }

  if (!decodedToken) return null

  const token = await decode({ token: decodedToken, secret: process.env.NEXTAUTH_SECRET! }) as DecodedToken | null

  return token?.sub ?? null
}
