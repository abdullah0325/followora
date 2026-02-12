"use client";

import Link from "next/link";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { normalizeImagePath } from "@/lib/utils/normalizeImagePath";

export default function ProductListItem({ product }) {
  const { _id, title, name, price, image, rating, occasion, category, discount } = product;
  const productTitle = title || name || "Unnamed Product";
  const productSlug = `${category?.toLowerCase() || "product"}/${productTitle?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <Link href={`/product/${productSlug}`}>
      <div className="flex gap-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4">
        {/* Image Section - Left */}
        <div className="w-40 h-40 shrink-0 relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 group">
          <img
            src={normalizeImagePath(image, "/placeholder.jpg")}
            alt={productTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 rounded-md text-xs font-bold">
              -{discount}%
            </div>
          )}
        </div>

        {/* Details Section - Right */}
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title and Category */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
              {productTitle}
            </h3>
            {category && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {typeof category === "string" ? category : category.name}
              </p>
            )}
            {occasion && (
              <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                {typeof occasion === "string" ? occasion : occasion.name}
              </p>
            )}
          </div>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.round(rating) ? "" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">({rating})</span>
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
                AED {price?.toFixed(2) || "0.00"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic
                }}
                className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-all duration-300"
                title="Add to Cart"
              >
                <FaShoppingCart className="text-sm" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Add to wishlist logic
                }}
                className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-all duration-300"
                title="Add to Wishlist"
              >
                <FaHeart className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}