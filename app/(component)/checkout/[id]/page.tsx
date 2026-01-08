"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from "@/app/schema/checkout.schema"
import { Icheckout } from "@/app/interface/checkout.interface"
import { useParams } from "next/navigation"
import { payProducts } from "@/app/Api/payment/checkout.api"
import Link from "next/link"
import { useState } from "react"

export default function Checkout() {
  const { id }: { id: string } = useParams()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: ""
    },
    resolver: zodResolver(checkoutSchema),
  })

  async function handlePayment(values: Icheckout) {
    setLoading(true)
    const data = await payProducts(values, id);
    if (data.status == 'success') {
      window.location.href = data.session.url;
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-neutral-900 transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-neutral-900">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-neutral-900">Checkout</h1>
          <p className="text-neutral-500 mt-2">Complete your order</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-200 text-neutral-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-2 text-sm text-neutral-500">Cart</span>
          </div>
          <div className="w-12 h-px bg-neutral-300 mx-4"></div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#c9a050] text-white text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-sm text-neutral-900 font-medium">Shipping</span>
          </div>
          <div className="w-12 h-px bg-neutral-300 mx-4"></div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-200 text-neutral-500 text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-sm text-neutral-500">Payment</span>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white border border-neutral-200 p-8 md:p-10">
          <h2 className="text-lg font-medium text-neutral-900 mb-6">Shipping Information</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-6">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 text-sm font-medium">
                      Address Details
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Street address, building, floor, etc."
                        className="auth-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 text-sm font-medium">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter your city"
                        className="auth-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 text-sm font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="Enter your phone number"
                        className="auth-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Order Summary */}
              <div className="border-t border-neutral-200 pt-6 mt-8">
                <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
                  <svg className="w-5 h-5 text-[#c9a050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure checkout powered by Stripe
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/cart"
                  className="btn-outline flex-1 justify-center"
                >
                  Back to Cart
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-[#c9a050] text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#967534] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Payment
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            All Cards Accepted
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Easy Returns
          </div>
        </div>
      </div>
    </div>
  )
}
