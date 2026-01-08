'use server'

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/auth'

export async function forgotPassword(email: string) {
  const res = await fetch(`${BASE_URL}/forgotPasswords`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  return res.json()
}

export async function verifyResetCode(resetCode: string) {
  const res = await fetch(`${BASE_URL}/verifyResetCode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetCode })
  })
  return res.json()
}

export async function resetPassword(email: string, newPassword: string) {
  const res = await fetch(`${BASE_URL}/resetPassword`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, newPassword })
  })
  return res.json()
}
