"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { ICategory } from '@/app/interface/category.interface';

export default function CategorySlider({ category }: { category: ICategory[] }) {
  return (
    <section className="py-16 md:py-20">
      {/* Section Header */}
      <div className="section-header">
        <span className="text-xs uppercase tracking-widest text-[#c9a050] font-medium">
          Browse by
        </span>
        <h2 className="section-title mt-2">Categories</h2>
        <div className="section-divider" />
      </div>

      {/* Category Slider */}
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 24 },
          1280: { slidesPerView: 6, spaceBetween: 24 }
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="px-4"
      >
        {category.map((cat: ICategory) => (
          <SwiperSlide key={cat._id}>
            <div className="category-card group">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0  from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Name */}
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="text-white font-medium text-sm md:text-base">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
