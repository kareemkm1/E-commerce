"use client"
import Image from 'next/image';
import Link from 'next/link';
import img1 from '../../../../public/images/c9a9ae5e-ca5e-4131-a7a8-7497c3254a10 (1).jpg';
import img2 from '../../../../public/images/modern-stationary-collection-arrangement.jpg';
import img3 from '../../../../public/images/makeup-cosmetics.jpg';
import img4 from '../../../../public/images/sharpen-your-mind-by-education.jpg';
import img5 from '../../../../public/images/top-view-traveling-essentials-collection.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: img5,
    subtitle: 'New Collection',
    title: 'Travel Essentials',
    description: 'Discover our curated selection of premium travel accessories.',
  },
  {
    image: img2,
    subtitle: 'Workspace',
    title: 'Modern Stationery',
    description: 'Elevate your desk with our minimalist office collection.',
  },
  {
    image: img3,
    subtitle: 'Beauty',
    title: 'Luxury Cosmetics',
    description: 'Premium beauty products for your daily routine.',
  },
  {
    image: img4,
    subtitle: 'Learning',
    title: 'Education Essentials',
    description: 'Quality supplies to inspire your journey.',
  },
  {
    image: img1,
    subtitle: 'Featured',
    title: 'Premium Selection',
    description: 'Handpicked items for the discerning customer.',
  },
];

export default function MainSlider() {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[70vh] md:h-[85vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-xl space-y-6">
                    {/* Subtitle */}
                    <span className="inline-block px-4 py-1.5 bg-[#c9a050] text-white text-xs font-medium uppercase tracking-widest">
                      {slide.subtitle}
                    </span>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-white/80 max-w-md">
                      {slide.description}
                    </p>

                    {/* CTA */}
                    <div className="flex gap-4 pt-4">
                      <Link
                        href="/product"
                        className="inline-flex items-center px-8 py-4 bg-white text-neutral-900 font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#c9a050] hover:text-white"
                      >
                        Shop Now
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </div>
  )
}
