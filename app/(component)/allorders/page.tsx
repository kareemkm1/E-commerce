'use client'

import { getUserOrders } from '@/app/Api/orders.api'
import { IOrder } from '@/app/interface/order.interface'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AllOrders() {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders()
        setOrders(Array.isArray(data) ? data : [])
      } catch (err) {
        setOrders([])
      }
      setLoading(false)
    }
    fetchOrders()
  }, [])

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
            <span className="text-neutral-900">My Orders</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-neutral-900">My Orders</h1>
          <p className="text-neutral-500 mt-2">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-neutral-200">
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Order ID</span>
                        <p className="text-sm font-medium text-neutral-900">#{order.id}</p>
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Date</span>
                        <p className="text-sm font-medium text-neutral-900">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Total</span>
                        <p className="text-sm font-medium text-neutral-900">{order.totalOrderPrice} EGP</p>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.isPaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {order.isPaid ? 'Paid' : 'Pending Payment'}
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.isDelivered
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.isDelivered ? 'Delivered' : 'Processing'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-neutral-200">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="px-6 py-4 flex gap-4">
                      {/* Product Image */}
                      <Link href={`/product/${item.product._id}`} className="shrink-0">
                        <div className="w-20 h-20 bg-neutral-100 overflow-hidden">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.product._id}`}>
                          <h3 className="text-neutral-900 font-medium hover:text-[#c9a050] transition-colors line-clamp-2">
                            {item.product.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-neutral-500 mt-1">
                          {item.product.category?.name}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-neutral-600">Qty: {item.count}</span>
                          <span className="text-neutral-900 font-medium">{item.price} EGP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Info */}
                <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <span className="text-xs text-neutral-500 uppercase tracking-wider">Shipping Address</span>
                      <p className="text-sm text-neutral-900 mt-1">
                        {order.shippingAddress.details}, {order.shippingAddress.city}
                      </p>
                      <p className="text-sm text-neutral-600">{order.shippingAddress.phone}</p>
                    </div>

                    <div className="text-sm">
                      <div className="flex justify-between gap-8">
                        <span className="text-neutral-500">Subtotal</span>
                        <span className="text-neutral-900">{order.totalOrderPrice - order.shippingPrice - order.taxPrice} EGP</span>
                      </div>
                      <div className="flex justify-between gap-8 mt-1">
                        <span className="text-neutral-500">Shipping</span>
                        <span className="text-neutral-900">{order.shippingPrice} EGP</span>
                      </div>
                      <div className="flex justify-between gap-8 mt-1">
                        <span className="text-neutral-500">Tax</span>
                        <span className="text-neutral-900">{order.taxPrice} EGP</span>
                      </div>
                      <div className="flex justify-between gap-8 mt-2 pt-2 border-t border-neutral-200 font-medium">
                        <span className="text-neutral-900">Total</span>
                        <span className="text-neutral-900">{order.totalOrderPrice} EGP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 py-16 px-4">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-lg font-medium text-neutral-900">No orders yet</h2>
              <p className="text-neutral-500 mt-1">When you place orders, they will appear here.</p>
              <Link href="/product" className="btn-gold mt-6 inline-flex">
                Start Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
