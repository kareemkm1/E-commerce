'use client'

import { getUserWishlist, removeProductFromWishlist } from '@/app/Api/wishlist.api'
import { IWishlistProduct, IWishlistResponse } from '@/app/interface/wishlist.interface'
import { wishlistContext } from '@/app/context/wishlistContext'
import { cartItemContext } from '@/app/context/cartContext'
import { AddToCart } from '@/app/Api/cartAction/addProductCart.api'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Wishlist() {
  const [products, setProducts] = useState<IWishlistProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const wishlistCtx = useContext(wishlistContext)
  const cartCtx = useContext(cartItemContext)

  if (!wishlistCtx || !cartCtx) {
    throw new Error('Context not found')
  }

  const { refreshWishlist } = wishlistCtx
  const { setDetails } = cartCtx

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data = await getUserWishlist() as IWishlistResponse
        setProducts(data.data || [])
      } catch (err) {
        setProducts([])
      }
      setLoading(false)
    }
    fetchWishlist()
  }, [])

  async function handleRemove(productId: string) {
    setRemoving(productId)
    try {
      await removeProductFromWishlist(productId)
      setProducts(prev => prev.filter(p => p._id !== productId))
      await refreshWishlist()
      toast.success('Removed from wishlist', {
        position: 'top-center',
        duration: 2000,
        style: { background: '#171717', color: '#fff', border: 'none' }
      })
    } catch (err) {
      toast.error('Failed to remove from wishlist')
    }
    setRemoving(null)
  }

  async function handleAddToCart(productId: string) {
    setAddingToCart(productId)
    try {
      const res = await AddToCart(productId)
      if (res.status === 'success') {
        setDetails(res.numOfCartItems)
        toast.success('Added to cart', {
          position: 'top-center',
          duration: 2000,
          style: { background: '#171717', color: '#fff', border: 'none' }
        })
      }
    } catch (err) {
      toast.error('Failed to add to cart')
    }
    setAddingToCart(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-50">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-900">Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-neutral-900">My Wishlist</h1>
          <p className="text-neutral-500 mt-2">
            {products.length} {products.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product._id} className="product-card group relative">
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemove(product._id)}
                  disabled={removing === product._id}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
                  title="Remove from wishlist"
                >
                  {removing === product._id ? (
                    <svg className="animate-spin h-4 w-4 text-red-500" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Image Container */}
                <Link href={`/product/${product._id}`}>
                  <div className="product-card-image">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </Link>

                {/* Content */}
                <div className="product-card-content">
                  <Link href={`/product/${product._id}`}>
                    <span className="product-card-category">
                      {product.category.name}
                    </span>
                    <h3 className="product-card-title mt-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="product-card-price">
                        {product.price} <span className="text-xs font-normal text-neutral-500">EGP</span>
                      </span>
                      <div className="product-card-rating">
                        <svg className="w-4 h-4 text-[#c9a050]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm">{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={addingToCart === product._id}
                    className="w-full mt-4 py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#c9a050] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {addingToCart === product._id ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 py-16 px-4">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-lg font-medium text-neutral-900">Your wishlist is empty</h2>
              <p className="text-neutral-500 mt-1">Save items you love by clicking the heart icon.</p>
              <Link href="/product" className="btn-gold mt-6 inline-flex">
                Browse Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
