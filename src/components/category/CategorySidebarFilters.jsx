'use client';

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/slices/productsSlice";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useParams } from "next/navigation";

export default function CategorySidebarFilters() {
  const dispatch = useDispatch();
  const params = useParams();
  const slug = params?.slug;
  const [price, setPrice] = useState([0, 5000]);

  const debouncedPrice = useDebounce(price);

  // When price changes, fetch products with category filter
  useEffect(() => {
    let query = `?category=${slug}&limit=24`;
    if (debouncedPrice[0] > 0 || debouncedPrice[1] < 5000) {
      query += `&minPrice=${debouncedPrice[0]}&maxPrice=${debouncedPrice[1]}`;
    }
    dispatch(fetchProducts(query));
  }, [debouncedPrice, slug]);

  const handlePriceChange = (index, value) => {
    const newPrice = [...price];
    newPrice[index] = Number(value) || 0;
    setPrice(newPrice);
  };

  return (
    <aside className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Filters</h2>
        <button
          onClick={() => {
            setPrice([0, 5000]);
            dispatch(fetchProducts(`?category=${slug}&limit=24`));
          }}
          className="text-sm text-pink-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Price Range</h3>
        <div className="flex gap-3">
          <input
            type="number"
            value={price[0]}
            min={0}
            max={price[1]}
            onChange={e => handlePriceChange(0, e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Min Price"
          />
          <input
            type="number"
            value={price[1]}
            min={price[0]}
            max={10000}
            onChange={e => handlePriceChange(1, e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Max Price"
          />
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          value={price[1]}
          onChange={e => handlePriceChange(1, e.target.value)}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-600"
        />
      </div>
    </aside>
  );
}
