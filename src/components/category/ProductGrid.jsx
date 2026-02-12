'use client';

import { useSelector } from "react-redux";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "../widgets/ProductCard";

export default function ProductsGrid({ loading }) {
  const { filteredProducts } = useSelector((s) => s.products);

  if (loading) return <ProductSkeleton />;

  if (!filteredProducts.length)
    return <p className="text-center py-10">No products found</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((p,i) => (
       <ProductCard key={p._id || i} product={p} />
      ))}
    </div>
  );
}
