'use client';

import Link from 'next/link';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-pink-600 dark:text-pink-400 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-pink-600 dark:bg-pink-400 mx-auto"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Illustration/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-48 h-48 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
            <span className="text-8xl">🌹</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiHome size={20} />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
          >
            <FiArrowLeft size={20} />
            Go Back
          </button>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-pink-600 dark:border-pink-400 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 font-medium rounded-lg transition-colors"
          >
            <FiSearch size={20} />
            Browse Products
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/flowers"
              className="text-pink-600 dark:text-pink-400 hover:underline text-sm"
            >
              Flowers
            </Link>
            <Link
              href="/cakes"
              className="text-pink-600 dark:text-pink-400 hover:underline text-sm"
            >
              Cakes
            </Link>
            <Link
              href="/gifts"
              className="text-pink-600 dark:text-pink-400 hover:underline text-sm"
            >
              Gifts
            </Link>
            <Link
              href="/blog"
              className="text-pink-600 dark:text-pink-400 hover:underline text-sm"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-pink-600 dark:text-pink-400 hover:underline text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


