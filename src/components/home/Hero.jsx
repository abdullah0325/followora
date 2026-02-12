"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroHeading } from "../ui/Heading";

function Counter( value ) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}

export default function HomePage() {
  return (
    <main className="min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center py-8 sm:py-12 md:py-0 px-3 sm:px-4 md:px-6
      bg-[#f9f6f2] text-gray-900
      dark:bg-[#0f0f0f] dark:text-gray-100"
     style={{
  backgroundImage: "url(/images/bg.png)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}}

      >

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">

        {/* TEXT */}
        <div>
          <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
            Fresh Collection
          </p>

          
          <HeroHeading text1="Where every petal" text2="tells a story of resilience" />
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8 max-w-md leading-relaxed">
            Discover cake, gifts and followers services crafted to make every
            moment special.
          </p>

          {/* BUTTON */}
          <Link
            href="/products"
            className="inline-block w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40 text-center text-xs sm:text-sm md:text-base"

          >
            View Collection
          </Link>

        </div>

     

      </div>
    </main>
  );
}
