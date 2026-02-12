'use client';
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <FiAlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Something went wrong
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>
          {error?.message && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 text-left">
              <p className="text-sm text-red-800 dark:text-red-300 font-mono">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <FiHome className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
