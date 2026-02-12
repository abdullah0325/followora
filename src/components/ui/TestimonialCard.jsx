import Image from "next/image";
import RatingStars from "./Rating";

export default function TestimonialCard({t}) {
  return (
      <div className=" rounded-2xl bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 p-6 shadow-xl">
        
        {/* Text */}
        <p className="text-gray-700 text-center mb-6 leading-relaxed">
          {t.message}
        </p>

        {/* Image with Pink Gradient Border */}
        <div className="flex justify-center mb-4">
          <div className="p-[3px] rounded-full bg-gradient-to-r from-pink-400 via-pink-500 to-rose-400 shadow-lg shadow-pink-400/60">
            <div className="rounded-full bg-white p-1">
              <Image
                src={t.image} // apni image yahan rakho (public folder)
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-center font-semibold text-gray-800">
          {t.name}
        </h3>

        <RatingStars rating={t.rating} />
      </div>
  );
}
