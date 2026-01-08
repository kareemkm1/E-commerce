import { GetProductDetails } from '../../../Api/productDetails.Api';
import AddBtn from '@/app/_component/addBtn/page';
import Link from 'next/link';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await GetProductDetails(id);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/product" className="hover:text-neutral-900 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-neutral-900">{data.category?.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-white border border-neutral-200 overflow-hidden">
              <img
                src={data.imageCover}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-[#c9a050]/10 text-[#967534] text-xs font-medium uppercase tracking-wider">
              {data.category?.name}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-light text-neutral-900 leading-tight">
              {data.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(data.ratingsAverage) ? 'text-[#c9a050]' : 'text-neutral-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-neutral-500">
                {data.ratingsAverage} ({data.ratingsQuantity || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="py-4 border-t border-b border-neutral-200">
              <span className="text-3xl font-semibold text-neutral-900">
                {data.price}
              </span>
              <span className="text-lg text-neutral-500 ml-2">EGP</span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="pt-4">
              <div className="max-w-xs">
                <AddBtn id={data._id} />
              </div>
            </div>

            {/* Features */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <svg className="w-5 h-5 text-[#c9a050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
                Free shipping on orders over 500 EGP
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <svg className="w-5 h-5 text-[#c9a050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                30-day return policy
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <svg className="w-5 h-5 text-[#c9a050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
