'use server'
import { GetAllBrands } from "@/app/Api/getAllBrands.Api";
import { IBrand } from "@/app/interface/brand.interface";
import Link from "next/link";

export default async function Brands() {
  const { data } = await GetAllBrands()

  return (
    <section className="min-h-screen bg-neutral-50">
      {/* Section Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <span className="text-xs uppercase tracking-widest text-[#c9a050] font-medium">
            Explore
          </span>
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 mt-2">
            Our Brands
          </h1>
          <p className="text-neutral-500 mt-4 max-w-2xl">
            Discover our curated collection of premium brands, each selected for their commitment to quality and excellence.
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {data.map((brand: IBrand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group"
            >
              <div className="bg-white border border-neutral-200 p-6 transition-all duration-300 hover:border-[#c9a050] hover:shadow-lg">
                <div className="aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name || 'Brand'}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {brand.name && (
                  <p className="text-center text-sm text-neutral-600 mt-4 font-medium group-hover:text-[#c9a050] transition-colors">
                    {brand.name}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
