'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { normalizeImagePath } from '@/lib/utils/normalizeImagePath';
import { callPublicApi } from '@/services/callApis';

export default function BestSelling() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSelling() {
      try {
        // Fetch products with badge=top_selling or just latest products
        const res = await callPublicApi('/products?limit=6&sort=newest', 'GET');
        if (res.success && res.data) {
          setProducts(res.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching best selling products:', error);
        // Don't show alert for empty errors
        if (error?.message) {
          // Optionally handle visible error
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBestSelling();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-900 dark:text-white">
            BEST SELLING
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-zinc-800 rounded-lg overflow-hidden animate-pulse">
                <div className="h-24 sm:h-32 md:h-36 lg:h-40 bg-gray-200 dark:bg-zinc-700" />
                <div className="p-1.5 sm:p-2 md:p-3 space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4" />
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-900 dark:text-white">
          BEST SELLING
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group"
            >
              <div
                className="
                  bg-white dark:bg-zinc-800
                  rounded-lg sm:rounded-xl overflow-hidden
                  shadow-sm hover:shadow-lg
                  transition-all duration-300
                "
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={normalizeImagePath(product.image)}
                    alt={product.name}
                    onError={(e) =>
                      (e.currentTarget.src = '/images/follower.jpg')
                    }
                    className="
                      w-full h-24 sm:h-32 md:h-36 lg:h-40 object-cover
                      transition-transform duration-500
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="p-1.5 sm:p-2 md:p-3">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-0.5 sm:mb-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <span className="text-pink-600 dark:text-pink-400 font-bold text-xs sm:text-sm">
                      AED {product.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
