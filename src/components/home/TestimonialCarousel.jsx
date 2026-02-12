'use client';

import { FaStar } from 'react-icons/fa';
import { LoginHeading } from '../ui/Heading';
import TestimonialCard from '../ui/TestimonialCard';

const testimonials = [
  {
    id: 1,
    name: 'Usama D.',
    message:
      "Valentine's Day pe red roses bouquet order kiya tha, time par.",
    rating: 4.5,
    image: '/images/testimonial.jpg',
  },
  {
    id: 2,
    name: 'Ayesha K.',
    message: 'Beautiful flowers and premium packaging. Highly recommended.',
    rating: 3,
    image: '/images/testimonial.jpg',
  },
  {
    id: 3,
    name: 'Ali R.',
    message: 'Great service and timely delivery. Will order again.',
    rating: 4,
    image: '/images/testimonial.jpg',
  },
  {
    id: 4,
    name: 'Sara A.',
    message: 'Best online flower shop experience ever!',
    rating: 5,
    image: '/images/testimonial.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 ">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/midnight_banner_desktop.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl text-center mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <LoginHeading text="What Our Customers Say" />

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 sm:mt-8 md:mt-10 justify-center gap-3 sm:gap-4 md:gap-6">
  {testimonials.map((t,i) => (
    <div
      key={t._id || i}
      className=''
    >
      <TestimonialCard t={t} />
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
