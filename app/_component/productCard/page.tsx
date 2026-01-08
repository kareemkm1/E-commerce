'use client'
import Link from "next/link"
import AddBtn from "../addBtn/page"
import WishlistBtn from "../wishlistBtn/page"
import { Iproduct } from "@/app/interface/product.interface"

export default function ProductCard({ product }: { product: Iproduct }) {
  return (
    <div className="product-card group relative flex flex-col h-full">
      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistBtn id={product._id} />
      </div>

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
      <div className="product-card-content flex flex-col flex-1 ">
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

        <div className="mt-auto ">
          <AddBtn id={product._id} />
        </div>
      </div>
    </div>
  )
}
