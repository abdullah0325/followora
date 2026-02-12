'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { callPublicApi } from '@/services/callApis';
import { normalizeImagePath } from '@/lib/utils/normalizeImagePath';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiShare2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const res = await callPublicApi(`/products/${id}`, 'GET');
        if (res.success && res.data) {
          setProduct(res.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Product Not Found'}
          </h1>
          <Link href="/" className="text-pink-500 hover:text-pink-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          <span>/</span>
          <Link href="/product" className="hover:text-pink-500">Products</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <img
              src={normalizeImagePath(product.image) || '/images/follower.jpg'}
              alt={product.name}
              onError={(e) => (e.currentTarget.src = '/images/follower.jpg')}
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <span className="text-sm text-pink-500 font-medium">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
              AED {product.price}
            </div>

            {/* Rating */}
            {product.ratings && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.ratings)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({product.ratings} ratings)
                </span>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Product Details */}
            <div className="space-y-3">
              {product.colour && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">Color:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {product.colour}
                  </span>
                </div>
              )}
              {product.size && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">Size:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {product.size}
                  </span>
                </div>
              )}
              {product.delivery && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">Delivery:</span>
                  <span className="text-gray-900 dark:text-white font-medium capitalize">
                    {product.delivery.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 rounded-xl border-2 border-gray-200 dark:border-zinc-700 hover:border-pink-500 transition-colors">
                <FiHeart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-3 rounded-xl border-2 border-gray-200 dark:border-zinc-700 hover:border-pink-500 transition-colors">
                <FiShare2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
