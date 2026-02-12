'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Usama D.',
    message:
      "Valentine's Day pe red roses bouquet order kiya tha, time par deliver hua aur flowers bilkul fresh thay. Meri wife bohot khush hui.",
    rating: 5,
    image: '/images/testimonial.jpg',
  },
  {
    id: 2,
    name: 'Ayesha K.',
    message:
      'Beautiful flowers and premium packaging. Highly recommended.',
    rating: 5,
    image: '/images/testimonial.jpg',
  },
  {
    id: 3,
    name: 'Ali R.',
    message:
      'Great service and timely delivery. Will order again.',
    rating: 4,
    image: '/images/testimonial.jpg',
  },
  {
    id: 4,
    name: 'Sara A.',
    message:
      'Best online flower shop experience ever!',
    rating: 5,
    image: '/images/testimonial.jpg',
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const maxIndex = testimonials.length - visible;

  const next = () =>
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const prev = () =>
    setIndex((i) => (i === 0 ? maxIndex : i - 1));

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/midnight_banner_desktop.jpg')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        
        <h2 className="text-center text-3xl font-bold text-white mb-12">
          What Our Customers Say
        </h2>

        {/* CARDS */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials
              .slice(index, index + visible)
              .map((t) => (
                <div
                  key={t.id}
                  className="
                    bg-white/90 dark:bg-zinc-800/90
                    backdrop-blur
                    rounded-xl
                    p-6
                    shadow-lg
                    transition
                  "
                >
                  {/* USER */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      onError={(e) =>
                        (e.currentTarget.src =
                          'https://i.pravatar.cc/100')
                      }
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t.name}
                      </h4>

                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    “{t.message}”
                  </p>
                </div>
              ))}
          </div>

          {/* CONTROLS */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-pink-500 hover:text-white transition"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-pink-500 hover:text-white transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
