'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ProductPageContent from "@/components/category/ProductPageContent";
import { fetchProducts } from "@/lib/slices/productsSlice";
export default function CategoryClient({ slug }) {

  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(fetchProducts(`?category=${slug}&limit=24`));
  }, [slug]);

  return <ProductPageContent />;
}
