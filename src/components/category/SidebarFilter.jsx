'use client';

import { useDispatch } from "react-redux";
import { fetchProducts } from "@/lib/slices/productsSlice";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useParams } from "next/navigation";

export default function SidebarFilters() {
  const dispatch = useDispatch();
  const params = useParams();
  const slug = params?.slug;
  const [price, setPrice] = useState(0);

  const debouncedPrice = useDebounce(price);

  // backend filter - preserve category slug
  useEffect(() => {
    let query = `?price=${debouncedPrice}`;
    if (slug) {
      query += `&category=${slug}`;
    }
    dispatch(fetchProducts(query));
  }, [debouncedPrice, slug]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Filters</h3>

      <input
        type="range"
        min="0"
        max="5000"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
