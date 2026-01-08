'use client'
import { wishlistContext } from "@/app/context/wishlistContext"
import { useContext, useState } from "react"
import { toast } from "sonner"

export default function WishlistBtn({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  const context = useContext(wishlistContext)
  if (!context) { throw new Error('Wishlist context not found') }

  const { isInWishlist, addToWishlist, removeFromWishlist } = context
  const inWishlist = isInWishlist(id)

  async function toggleWishlist() {
    if (loading) return
    setLoading(true)

    try {
      if (inWishlist) {
        await removeFromWishlist(id)
        toast.success('Removed from wishlist', {
          position: 'top-center',
          duration: 2000,
          style: { background: '#171717', color: '#fff', border: 'none' }
        })
      } else {
        await addToWishlist(id)
        toast.success('Added to wishlist', {
          position: 'top-center',
          duration: 2000,
          style: { background: '#171717', color: '#fff', border: 'none' }
        })
      }
    } catch (err) {
      toast.error('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={loading}
      className={`
        p-2 rounded-full transition-all duration-300
        ${inWishlist
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-red-500'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill={inWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  )
}
