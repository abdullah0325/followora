"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProducts, deleteProduct } from "@/lib/api/product";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      console.log("res",res);
      
      setProducts(res.data.products);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
  const res=    await deleteProduct(id);
  console.log("res in deleting",res);
  
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, fetchProducts, removeProduct };
}
