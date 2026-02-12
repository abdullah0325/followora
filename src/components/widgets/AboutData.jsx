import React from 'react'
import { HeroHeading } from '../ui/Heading'

const AboutData = () => {
  return (
    <div data-aos="zoom-out" className="px-3 sm:px-4 md:px-6">
    <span className="text-pink-600 font-semibold tracking-wide text-xs sm:text-sm md:text-base">
      About Aroma Follower
    </span>
{/* 
    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-6 leading-tight">
      Where Flowers, Gifts <br /> & Cakes Create Memories
    </h2> */}
 <HeroHeading text1="Where Flowers, Gifts" text2="& Cakes Create Memories"/>
    <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
      Aroma Follower brings you premium flower bouquets, elegant gift
      arrangements and delicious cakes to make every moment special.
      Whether it’s love, celebration or surprise — we deliver emotions.
    </p>

    <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-xs sm:text-sm md:text-base">
      From birthdays to anniversaries, our handcrafted designs and
      same-day delivery ensure happiness at your doorstep.
    </p>

    {/* STATS */}
    <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-wrap">
      <div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">10+</h3>
        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base mt-1">
          Years Experience
        </p>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">5k+</h3>
        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base mt-1">
          Happy Customers
        </p>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600">100%</h3>
        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base mt-1">
          Fresh Products
        </p>
      </div>
    </div>
  </div>  )
}

export default AboutData