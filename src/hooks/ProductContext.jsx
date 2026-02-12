"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [facets, setFacets] = useState({
    categories: {},
    occasions: {},
    colors: {},
    sizes: {},
  });

  const [filters, setFilters] = useState({
    category: "",
    occasion: "",
    color: "",
    size: "",
    search: "",
    page: 1,
    limit: 50,
  });

  const fetchProducts = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      category: filters.category || "",
      occasion: filters.occasion || "",
      color: filters.color || "",
      size: filters.size || "",
      search: filters.search || "",
      page: filters.page || 1,
      limit: filters.limit || 50,
    });

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data || []);
        if (data.facets) {
          setFacets(data.facets);
        }
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }

    setLoading(false);
  };

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        filters,
        setFilters,
        facets,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
