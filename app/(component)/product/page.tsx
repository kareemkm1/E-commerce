import ProductCard from "@/app/_component/productCard/page";
import { GetAllProducts } from "@/app/Api/allProduct.Api"
import { Iproduct } from "@/app/interface/product.interface";

export default async function Products() {
  const { data } = await GetAllProducts();

  return (
    <section className="py-16 md:py-20">
      {/* Section Header */}
      <div className="section-header">
        <span className="text-xs uppercase tracking-widest text-[#c9a050] font-medium">
          Discover
        </span>
        <h2 className="section-title mt-2">Our Products</h2>
        <p className="section-subtitle mt-4">
          Curated selection of premium items for the modern lifestyle
        </p>
        <div className="section-divider" />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {data.map((product: Iproduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
