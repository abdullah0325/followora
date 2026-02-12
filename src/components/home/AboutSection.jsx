'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ImageGrid from '../widgets/ImageGrid';
import AboutData from '../widgets/AboutData';

export default function AboutAromaFollower() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-zinc-900">
      <main className="w-full sm:w-[90%] md:w-[85%] mx-auto px-3 sm:px-4 md:px-6 mt-4 sm:mt-8 md:mt-12 lg:mt-20 text-gray-900 font-sans ">
        <div className="container mx-auto py-4 sm:py-6 md:py-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Image Grid */}
            <div className="w-full lg:w-1/2 px-0 sm:px-2">
              <ImageGrid />
            </div>
            <div className="w-full lg:w-1/2">
              <AboutData />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
