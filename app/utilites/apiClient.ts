'use server'
import getMyToken from "./getMyToken"

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

async function getAuthHeaders() {
  const token = await getMyToken()
  return {
    token: token as string,
    'Content-Type': 'application/json'
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  body?: object
  requiresAuth?: boolean
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, requiresAuth = true } = options

  const headers = requiresAuth ? await getAuthHeaders() : { 'Content-Type': 'application/json' }

  const config: RequestInit = {
    method,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config)
  return res.json()
}

// Cart specific helpers
export async function getCart() {
  return apiRequest('/cart')
}

export async function addToCart(productId: string) {
  return apiRequest('/cart', {
    method: 'POST',
    body: { productId }
  })
}

export async function updateCartItem(productId: string, count: number) {
  return apiRequest(`/cart/${productId}`, {
    method: 'PUT',
    body: { count }
  })
}

export async function removeCartItem(productId: string) {
  return apiRequest(`/cart/${productId}`, {
    method: 'DELETE'
  })
}

export async function clearCart() {
  return apiRequest('/cart', {
    method: 'DELETE'
  })
}

// Wishlist helpers
export async function getWishlist() {
  return apiRequest('/wishlist')
}

export async function addToWishlist(productId: string) {
  return apiRequest('/wishlist', {
    method: 'POST',
    body: { productId }
  })
}

export async function removeFromWishlist(productId: string) {
  return apiRequest(`/wishlist/${productId}`, {
    method: 'DELETE'
  })
}

// Orders helper
export async function getUserOrders(userId: string) {
  return apiRequest(`/orders/user/${userId}`, { requiresAuth: false })
}
