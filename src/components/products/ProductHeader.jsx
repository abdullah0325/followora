"use client";

import { useProduct } from "@/hooks/ProductContext";
import { useSelector } from "react-redux";
import { FaThLarge, FaTh } from "react-icons/fa";

export default function TopBar() {
  const productContext = useProduct();
  const reduxProducts = useSelector((state) => state.products?.filteredProducts);
  
  // Use Redux products if available, otherwise use ProductContext
  const filteredProducts = reduxProducts || productContext?.filteredProducts;
  const filters = productContext?.filters;
  const setFilters = productContext?.setFilters;

  if (!setFilters || !filters) return null;

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
              onClick={() => setFilters((prev) => ({ ...prev, grid: 3 }))}
              title="3 Columns"
              className={`rounded-lg p-2 transition-all duration-300 ${
                filters.grid === 3
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-500/40"
                  : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-pink-900/30 dark:hover:text-pink-400"
              }`}
            >
              <FaThLarge className="text-lg" />
            </button>

            <button
              onClick={() => setFilters((prev) => ({ ...prev, grid: 4 }))}
              title="4 Columns"
              className={`rounded-lg p-2 transition-all duration-300 ${
                filters.grid === 4
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-500/40"
                  : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:text-pink-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-pink-900/30 dark:hover:text-pink-400"
              }`}
            >
              <FaTh className="text-lg" />
            </button>
          </div>

          {/* Sort Dropdown — RIGHT */}
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
