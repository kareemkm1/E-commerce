'use client'
import { AddToCart } from "@/app/Api/cartAction/addProductCart.api";
import { cartItemContext } from "@/app/context/cartContext";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  const context = useContext(cartItemContext)
  if (!context) { throw new Error('Not Exist') }
  const { setDetails } = context

  async function addProductToCart() {
    if (loading) return
    setLoading(true)

    try {
      const result = await AddToCart(id);
      if (typeof result === 'object' && result !== null && 'status' in result) {
        const res = result as { status: string; numOfCartItems?: number };
        setDetails(res.numOfCartItems ?? 0)
        if (res.status === 'success') {
          toast.success('Added to cart', {
            position: 'top-center',
            duration: 2000,
            style: {
              background: '#171717',
              color: '#fff',
              border: 'none',
            }
          })
        }
      } else {
        toast.error('Please signin first', { position: 'top-center' })
      }
    } catch (e) {
      toast.error('Failed to add to cart', { position: 'top-center' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={() => addProductToCart()}
      disabled={loading}
      className="
        w-full py-3
        bg-neutral-900 text-white text-sm font-medium tracking-wide
        transition-all duration-300
        hover:bg-[#c9a050]
        disabled:opacity-70 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
      "
    >
      {loading ? (
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
  )
}
