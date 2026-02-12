'use client';

import { useSelector } from "react-redux";
import CategorySidebarFilters from "./CategorySidebarFilters";
import CategoryProductHeader from "./CategoryProductHeader"
import ProductsGrid from "./ProductGrid";
import Pagination from "../ui/Pagination";
export default function ProductPageContent() {
  const { loading } = useSelector((state) => state.products);

  return (
    <div className="flex gap-6 max-w-7xl mx-auto px-4 my-6">

      <aside className="hidden lg:block w-80">
        <CategorySidebarFilters />
      </aside>

      <main className="flex-1">
        <CategoryProductHeader />
        <ProductsGrid loading={loading} />
        <Pagination />
      </main>

    </div>
  );
}
