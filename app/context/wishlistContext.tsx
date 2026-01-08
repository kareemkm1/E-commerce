'use client'
import { createContext, useEffect, useState } from "react"
import { getUserWishlist, addProductToWishlist, removeProductFromWishlist } from "../Api/wishlist.api"
import type { IWishlistResponse } from "../interface/wishlist.interface"

type WishlistContextType = {
  wishlistIds: string[]
  wishlistCount: number
  addToWishlist: (productId: string) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
  isInWishlist: (productId: string) => boolean
  refreshWishlist: () => Promise<void>
}

export const wishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistContextProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])

  async function refreshWishlist() {
    try {
      const resp = await getUserWishlist() as IWishlistResponse
      if (resp.data) {
        setWishlistIds(resp.data.map(item => item._id))
      }
    } catch (err) {
      setWishlistIds([])
    }
  }

  useEffect(() => {
    refreshWishlist()
  }, [])

  async function addToWishlist(productId: string) {
    try {
      await addProductToWishlist(productId)
      setWishlistIds(prev => [...prev, productId])
    } catch (err) {
      console.error('Failed to add to wishlist')
    }
  }

  async function removeFromWishlist(productId: string) {
    try {
      await removeProductFromWishlist(productId)
      setWishlistIds(prev => prev.filter(id => id !== productId))
    } catch (err) {
      console.error('Failed to remove from wishlist')
    }
  }

  function isInWishlist(productId: string) {
    return wishlistIds.includes(productId)
  }

  return (
    <wishlistContext.Provider value={{
      wishlistIds,
      wishlistCount: wishlistIds.length,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      refreshWishlist
    }}>
      {children}
    </wishlistContext.Provider>
  )
}
