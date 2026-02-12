'use client';

import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import ProductCard from '../widgets/ProductCard';
import 'aos/dist/aos.css';
import { HeroHeading, LoginHeading } from '../ui/Heading';


export default function ProductCarousel({ title, products = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // Responsive visible cards
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCards(2);        // xs/sm: 2 cards
      else if (width < 1024) setVisibleCards(3);  // md: 3 cards
      else setVisibleCards(4);                    // lg+: 4 cards
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCards);

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white dark:bg-zinc-900" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-10">
          <div className="flex-1">
            <LoginHeading text={title} />
          </div>

          <div className="flex gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
            <button
              onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}
              disabled={currentIndex === 0}
              className="p-1.5 sm:p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 dark:bg-zinc-800 disabled:opacity-40 transition-all text-sm sm:text-base"
            >
              <FiChevronLeft />
            </button>
            {/* <Link href="/products">
              <button className="p-1.5 sm:p-2 rounded-full text-[12px] bg-pink-500 text-white hover:bg-pink-600 dark:bg-zinc-800 transition-all ">
                View
              </button>
            </Link> */}
            <button
              onClick={() => setCurrentIndex((p) => Math.min(p + 1, maxIndex))}
              disabled={currentIndex === maxIndex}
              className="p-1.5 sm:p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 dark:bg-zinc-800 disabled:opacity-40 transition-all text-sm sm:text-base"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {products
            .slice(currentIndex, currentIndex + visibleCards)
            .map((product, index) => (
              <div key={`${product.slug}-${currentIndex + index}`} 
               data-aos-duration={index * 100}
               > 

                <ProductCard
                  product={product}
                  aosDelay={index * 120}
                />
               </div>
            ))}
        </div>
      </div>
    </section>
  );
}
