// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { HeroHeading } from "../ui/Heading";

// function Counter( value ) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const duration = 1500;
//     const increment = value / (duration / 16);

//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= value) {
//         setCount(value);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [value]);

//   return <span>{count.toLocaleString()}</span>;
// }

// export default function HomePage() {
//   return (
//     <main className="min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center py-8 sm:py-12 md:py-0 px-3 sm:px-4 md:px-6
//       bg-[#f9f6f2] text-gray-900
//       dark:bg-[#0f0f0f] dark:text-gray-100"
//      style={{
//   backgroundImage: "url(/images/bg.png)",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
// }}

//       >

//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">

//         {/* TEXT */}
//         <div>
//           <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
//             Fresh Collection
//           </p>

          
//           <HeroHeading text1="Where every petal" text2="tells a story of resilience" />
//           <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8 max-w-md leading-relaxed">
//             Discover cake, gifts and followers services crafted to make every
//             moment special.
//           </p>

//           {/* BUTTON */}
//           <Link
//             href="/products"
//             className="inline-block w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40 text-center text-xs sm:text-sm md:text-base"

//           >
//             View Collection
//           </Link>

//         </div>

     

//       </div>
//     </main>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroHeading } from "../ui/Heading"; // Make sure this import matches your export

// If HeroHeading is a default export, use:
// import HeroHeading from "../ui/Heading";

function Counter({ value }) { // Fixed: destructure value prop
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
    <main 
      className="min-h-screen flex items-center justify-center py-6 sm:py-8 md:py-0 px-4 sm:px-6 md:px-8
        bg-[#f9f6f2] text-gray-900
        dark:bg-[#0f0f0f] dark:text-gray-100"
      style={{
        backgroundImage: "url(/images/bg.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        {/* TEXT */}
        <div className="text-center md:text-left">
          <p className="text-xs sm:text-sm md:text-base uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
            Fresh Collection
          </p>
          
          {/* Make sure HeroHeading receives the correct props */}
          <HeroHeading text1="Where every petal" text2="tells a story of resilience" />
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Discover cake, gifts and followers services crafted to make every
            moment special.
          </p>

          {/* BUTTONS ROW - Always in row on all screens */}
          <div className="flex flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
            {/* View Collection Button */}
            <Link
              href="/products"
              className="flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2.5 sm:py-2.5 md:py-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40 text-center text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              View Collection
            </Link>

            {/* WhatsApp Button */}
            <Link
              href="https://wa.me/923251851838"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2.5 sm:py-2.5 md:py-3.5 rounded-lg sm:rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/40 text-center text-xs sm:text-sm md:text-base whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <svg 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.177.181-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
              </svg>
              <span>WhatsApp</span>
            </Link>
          </div>
        </div>

        {/* Right side - can add image or leave empty */}
        <div className="hidden md:block"></div>
      </div>
    </main>
  );
}