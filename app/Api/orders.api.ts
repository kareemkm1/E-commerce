'use server'
import { getUserId } from "@/app/utilites/getMyToken"

export async function getUserOrders() {
  const userId = await getUserId()

  if (!userId) {
    return []
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  const data = await res.json()

  return data
}
