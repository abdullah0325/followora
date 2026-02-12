'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiShoppingCart,
  FiHeart,
  FiArrowLeft,
} from 'react-icons/fi';
import { normalizeImagePath } from '@/lib/utils/normalizeImagePath';
import { useCart } from '@/hooks/CartContext';
import { useWishlist } from '@/hooks/WishlistContext';

export default function ProductDetails() {
  const params = useParams();
  const productSlug = params?.productSlug || '';
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist: checkWishlist } = useWishlist();

  /** 🔹 Product from Redux */
  const product = useSelector((state) =>
    state.products.products.find(
      (p) => p.slug === productSlug
    )
  );

  const isWishlisted = product ? checkWishlist(product.id || product._id) : false;

  /** ❌ Product not found */
  if (!product) {
    // ... existing not found checks ...
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Product Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This product does not exist or was removed.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  /** 🛒 Add to cart */
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  /** ❤️ Wishlist toggle */
  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* 🔙 Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 mb-6"
        >
          <FiArrowLeft />
          Back to Products
        </Link>

        {/* 🧾 Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">

            {/* 🖼 Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden
              bg-gradient-to-br from-pink-100 via-pink-200 to-red-100
              dark:from-pink-900 dark:via-pink-800 dark:to-red-900
              shadow-inner shadow-pink-300/40 dark:shadow-pink-500/30"
            >
              <img
                src={normalizeImagePath(product.image_url)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* ℹ️ Info */}
            <div className="flex flex-col">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.category && (
                  <span className="px-3 py-1 text-sm rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300">
                    {product.category}
                  </span>
                )}
                {product.occasion && (
                  <span className="px-3 py-1 text-sm rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                    {product.occasion}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                  AED {product.price.toFixed(2)}
                </span>

                {product.originalPrice && (
                  <span className="line-through text-gray-400">
                    AED {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6 text-sm">
                {product.deliveryTime && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Delivery:</strong> {product.deliveryTime}
                  </p>
                )}
                {product.color && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Color:</strong> {product.color}
                  </p>
                )}
                {product.size && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Size:</strong> {product.size}
                  </p>
                )}
              </div>

              {/* 📖 Description (Redux se) */}
              {product.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Description
                  </h3>
                  <div className="text-gray-600 dark:text-gray-300 space-y-2 leading-relaxed">
                    {product.description
                      .split('\n')
                      .map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* 🔘 Buttons */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition"
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>

                <button
                  onClick={handleWishlist}
                  className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${isInWishlist
                      ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                      : 'bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white'
                    }`}
                >
                  <FiHeart className={isInWishlist ? 'fill-current' : ''} />
                  {isInWishlist ? 'Wishlisted' : 'Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
