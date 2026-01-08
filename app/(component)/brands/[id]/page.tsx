import { GetBrandDetails } from '@/app/Api/brandDetails.Api';
import { GetAllProducts } from '@/app/Api/allProduct.Api';
import { Iproduct } from '@/app/interface/product.interface';
import Link from 'next/link';
import ProductCard from '@/app/_component/productCard/page';

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [brandResponse, productsResponse] = await Promise.all([
    GetBrandDetails(id),
    GetAllProducts()
  ]);

  const brand = brandResponse.data;
  const brandProducts = productsResponse.data.filter(
    (product: Iproduct) => product.brand._id === id
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/brands" className="hover:text-neutral-900 transition-colors">Brands</Link>
            <span>/</span>
            <span className="text-neutral-900">{brand.name}</span>
          </nav>
        </div>
      </div>

      {/* Brand Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Brand Logo */}
            <div className="w-32 h-32 bg-neutral-100 rounded-full p-4 flex items-center justify-center shrink-0">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Brand Info */}
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[#c9a050]/10 text-[#967534] text-xs font-medium uppercase tracking-wider">
                Brand
              </span>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 mt-3">
                {brand.name}
              </h1>
              {brand.slug && (
                <p className="text-neutral-500 mt-1 text-sm">@{brand.slug}</p>
              )}
              <p className="text-neutral-600 mt-4 max-w-xl">
                Explore our collection of {brandProducts.length} products from {brand.name}. We partner with premium brands to bring you the finest quality items.
              </p>

              {/* Features */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9a050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                  Authentic Products
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9a050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                  Official Partner
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9a050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                  Quality Assured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-light text-neutral-900">Products by {brand.name}</h2>
            <p className="text-neutral-500 mt-1">{brandProducts.length} products available</p>
          </div>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {brandProducts.map((product: Iproduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900">No products found</h3>
            <p className="text-neutral-500 mt-1">There are no products from this brand yet.</p>
            <Link href="/product" className="btn-gold mt-6 inline-flex">
              Browse All Products
            </Link>
          </div>
        )}
      </div>

      {/* Back to Brands */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border-t border-neutral-200 pt-8">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Brands
          </Link>
        </div>
      </div>
    </div>
  );
}
