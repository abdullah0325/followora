"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSidebar from "./SidebarFilters";
import TopBar from "./ProductHeader";
import ProductsGrid from "./ProductGrid";
import { fetchProducts } from "@/lib/slices/productsSlice";

function ProductPageContent() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts("?limit=1000"));
  }, [dispatch]);

  return (
    <div className="flex gap-4 sm:gap-6 lg:gap-8 my-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:block w-80 shrink-0">
        <FilterSidebar />
      </div>
      
      {/* Main content */}
      <section className="flex-1 min-w-0">
        <TopBar />
        <ProductsGrid loading={loading} />
      </section>
    </div>
  );
}


export default ProductPageContent