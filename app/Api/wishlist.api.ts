'use server'
import { addToWishlist, getWishlist, removeFromWishlist } from "@/app/utilites/apiClient"

export async function getUserWishlist() {
  return getWishlist()
}

export async function addProductToWishlist(productId: string) {
  return addToWishlist(productId)
}

export async function removeProductFromWishlist(productId: string) {
  return removeFromWishlist(productId)
}
