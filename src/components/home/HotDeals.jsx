'use client';

import Link from 'next/link';
import { LoginHeading } from '../ui/Heading';

export default function HotDeals() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center bg-gradient-to-r from-red-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-900 rounded-lg p-4 sm:p-6 md:p-8">
          <div className="flex justify-center order-2 md:order-1">
            <div className="w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-green-200 to-green-300 dark:from-green-900 dark:to-green-800 rounded-lg flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              🎄
            </div>
          </div>
          <div className="order-1 md:order-2">
            <LoginHeading text="Hurry Up! Grab the best deals before they are gone!" />
            <Link
              href="/product"
              className="inline-block w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 mt-4 sm:mt-6 md:mt-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40 text-center text-xs sm:text-sm md:text-base"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


