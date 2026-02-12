'use client';

import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import toast from "react-hot-toast";

export default function ProductCard({ product = {} }) {
  const { token } = useCart()
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, setIs } = useWishlist();
  const isWishlisted = isInWishlist(product.id || product._id);
  // ✅ SAFE FALLBACKS (hard-coded)


  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ✅ User logged in
    if (token) {
      toggleWishlist(product);
      return;
    }

    // ❌ Guest user → LocalStorage wishlist
    const existingWishlist =
      JSON.parse(localStorage.getItem("wishList")) || [];

    const alreadyExists = existingWishlist.some(
      (item) => (item._id || item.id) === (product._id || product.id)
    );

    let updatedWishlist;

    if (alreadyExists) {
      // ➖ Remove
      updatedWishlist = existingWishlist.filter(
        (item) => (item._id || item.id) !== (product._id || product.id)
      );
      localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
      toast.success("Removed from wishlist ❤️");
    } else {
      // ➕ Add
      updatedWishlist = [...existingWishlist, product];
      localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
      toast.success("Added to wishlist 🤍");
    }
  };



  const title =
    product.title ||
    product.name ||
    'Proposal Setup';

  const description =
    product.description ||
    'Beautiful romantic proposal decoration setup';

  const price =
    product.price ?? 499;

  const rating =
    product.rating ?? 4.5;

  const sale =
    typeof product.sale === 'number' ? product.sale : null;

  const image =
    product.image
      ? product.image.startsWith('/') || product.image.startsWith('http')
        ? product.image
        : `/${product.image}`
      : '/images/follower.jpg';

  return (
    <div
      className="
        group relative 
        bg-white dark:bg-zinc-900
        rounded-xl overflow-hidden
        shadow-sm hover:shadow-lg
        transition-all duration-300
      "
    >
      {/* SALE BADGE */}
      {sale !== null && sale > 0 && (
        <div
          className="
            absolute top-3 right-3 z-20
            w-12 h-12 rounded-full
            bg-pink-600 text-white
            flex items-center justify-center
            text-sm font-bold
          "
        >
          {sale}%
        </div>
      )}

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          onError={(e) => (e.currentTarget.src = '/images/follower.jpg')}
          className="
            w-full
            h-40 sm:h-48 md:h-56 lg:h-60
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* HOVER ICONS */}
        <div
          className="
            absolute inset-0
            bg-black/40
            flex items-center justify-center gap-3 sm:gap-4
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <button
            aria-label="Preview"
            className="p-1.5 sm:p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
          >
            <FiEye size={16} className="sm:w-[18px] transition-transform duration-700 ease-in-out group-hover:rotate-360" />
          </button>

          <button
            aria-label="Wishlist"
            onClick={handleWishlistClick}
            className="p-1.5 sm:p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
          >
            <FiHeart
              size={16} className={`sm:w-[18px] ${isWishlisted ? "fill-red-500 text-red-500" : ""} transition-transform duration-700 ease-in-out group-hover:rotate-360`}
            />
          </button>

          <button
            aria-label="Add to cart"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="p-1.5 sm:p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
          >
            <FiShoppingCart size={16} className="sm:w-[18px] transition-transform duration-700 ease-in-out group-hover:rotate-360" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h3>

        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5 sm:mt-1">
          {description}
        </p>

        {/* PRICE + RATING */}
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <span className="text-pink-600 dark:text-pink-400 font-bold text-xs sm:text-sm md:text-base">
            AED {price}
          </span>

          <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm">
            <FaStar className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-gray-700 dark:text-gray-300">
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
