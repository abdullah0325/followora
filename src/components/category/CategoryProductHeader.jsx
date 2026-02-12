"use client";

import { useSelector } from "react-redux";
import { FaThLarge, FaTh } from "react-icons/fa";

export default function CategoryProductHeader() {
  const { filteredProducts } = useSelector((state) => state.products);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-pink-200 bg-linear-to-r from-pink-50 to-red-50 p-4 dark:border-pink-800/50 dark:from-pink-900/20 dark:to-red-900/20">
        
        {/* Results */}
        <div>
          <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
            Results
          </p>
          <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
            {Array.isArray(filteredProducts) ? filteredProducts.length : 0} products
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 ml-auto">
          
          {/* Grid Icons — LEFT */}
          <div className="flex items-center gap-2">
            <button
              disabled
              title="Grid view"
              className="rounded-lg p-2 transition-all duration-300 bg-pink-600 text-white shadow-lg shadow-pink-500/40"
            >
              <FaTh className="text-lg" />
            </button>
          </div>

          {/* Sort Dropdown — RIGHT */}
          <select
            disabled
            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="recommended">Recommended</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="AtoZ">Name: A to Z</option>
            <option value="ZtoA">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
