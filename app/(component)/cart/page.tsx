'use client'

import { clearAllCart } from "@/app/Api/cartAction/clearAllProducts.api"
import { getLoggedUserCart } from "@/app/Api/cartAction/getLoggedUserCart.api"
import { removeSpacificItem } from "@/app/Api/cartAction/removeProductCart.api"
import { updateProduct } from "@/app/Api/cartAction/updateCart.api"
import { cartItemContext } from "@/app/context/cartContext"
import { Product } from "@/app/interface/cart.interface"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"

export default function Cart() {
  const [loading, setLoading] = useState(true)
  const [cartList, setList] = useState<Product[]>([])
  const [totalPrice, setPrice] = useState(0)
  const [updating, setUpdating] = useState(false)
  const [clearing, setClearing] = useState(false)

  const context = useContext(cartItemContext)
  if (!context) { throw new Error('Not Exist') }
  const { setDetails } = context

  const [cartId, setCartId] = useState<string>('')

  async function getCardData() {
    try {
      let res = await getLoggedUserCart()
      setCartId(res.cartId)
      setDetails(res.numOfCartItems)
      setPrice(res.data.totalCartPrice)
      setList(res.data.products)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCardData()
  }, [])

  async function updateProductCart(id: string, countNumber: number) {
    if (countNumber < 1 || updating) return
    setUpdating(true)
    const response = await updateProduct(id, countNumber)
    if (response.status === 'success') {
      getCardData()
    }
    setUpdating(false)
  }

  async function removeProductFromCart(id: string) {
    const response = await removeSpacificItem(id)
    if (response.status === 'success') {
      setList(prev => prev.filter(p => p.product._id !== id))
      setPrice(response.data.totalCartPrice)
      setDetails(response.numOfCartItems)
    }
  }

  async function clearAllProductsFromCart() {
    if (clearing) return
    setClearing(true)

    const response = await clearAllCart()
    if (response.status === 'success' || response.message === 'success') {
      setList([])
      setPrice(0)
      setDetails(0)
    }

    setClearing(false)
  }

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-neutral-50'>
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-light text-neutral-900">Shopping Cart</h1>
          <p className="text-neutral-500 mt-2">
            {cartList.length} {cartList.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      {cartList.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Clear All Button */}
              <div className="flex justify-end">
                <button
                  disabled={clearing}
                  onClick={() => clearAllProductsFromCart()}
                  className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                >
                  {clearing ? 'Clearing...' : 'Clear All'}
                </button>
              </div>

              {/* Items List */}
              <div className="bg-white border border-neutral-200">
                {cartList.map((p, index) => (
                  <div
                    key={p.product._id}
                    className={`p-6 flex gap-6 ${index !== cartList.length - 1 ? 'border-b border-neutral-200' : ''}`}
                  >
                    {/* Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-100 shrink-0 overflow-hidden">
                      <img
                        src={p.product.imageCover}
                        alt={p.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-neutral-900 font-medium truncate pr-4">
                            {p.product.title}
                          </h3>
                          <p className="text-sm text-neutral-500 mt-1">
                            Unit Price: {p.price / p.count} EGP
                          </p>
                        </div>
                        <span className="text-lg font-semibold text-neutral-900 shrink-0">
                          {p.price} EGP
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="qty-selector">
                          <button
                            type="button"
                            disabled={updating}
                            onClick={() => updateProductCart(p.product._id, p.count - 1)}
                            className="qty-btn"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={p.count}
                            className="qty-input"
                          />
                          <button
                            type="button"
                            disabled={updating}
                            onClick={() => updateProductCart(p.product._id, p.count + 1)}
                            className="qty-btn"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeProductFromCart(p.product._id)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-neutral-200 p-8 sticky top-24">
                <h2 className="text-lg font-medium text-neutral-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>{totalPrice} EGP</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="text-[#c9a050]">Free</span>
                  </div>
                </div>

                <div className="border-t border-neutral-200 mt-6 pt-6">
                  <div className="flex justify-between text-lg font-semibold text-neutral-900">
                    <span>Total</span>
                    <span>{totalPrice} EGP</span>
                  </div>
                </div>

                {cartId && (
                  <Link
                    href={`/checkout/${cartId}`}
                    className="btn-gold w-full mt-8 justify-center"
                  >
                    Proceed to Checkout
                  </Link>
                )}

                <Link
                  href="/product"
                  className="block text-center text-sm text-neutral-600 hover:text-neutral-900 mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="empty-state">
            <svg className="w-24 h-24 mx-auto text-neutral-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="empty-state-title">Your cart is empty</h2>
            <p className="empty-state-text">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link href="/product" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
