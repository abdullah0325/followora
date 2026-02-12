"use client";

import { useEffect, useState } from "react";
import HomePage from "@/components/home/Hero";
import AboutAromaFollower from "@/components/home/AboutSection";
// import OccasionSlider from "@/components/OccasionSlider";
import OccasionSlider from "@/components/home/Ocassion";
import ProductCarousel from "@/components/home/ProductCarousel";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import HotDeals from "@/components/home/HotDeals";
import BestSelling from "@/components/home/BestSelling";
// import MidnightDeliveryBanner from "@/components/MidnightDeliveryBanner";
import Testimonials from "@/components/home/TestimonialCarousel";
// import TestimonialCarousel from "@/components/home/MidnightDeliveryBanner";
import { callPublicApi, getCategories, getProducts } from "@/services/callApis";

export default function page() {
  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  // categories
  const fetchCategories = async () => {
    const res = await callPublicApi("/categories", "GET", undefined);
    console.log("res categories", res);

    if (res.success) setCategories(res.data?.categories || []);
  };

  // occasions
  const fetchOccasions = async () => {
    const res = await callPublicApi("/occasions", "GET", undefined);
    console.log("res ", res);

    if (res.success) setOccasions(res.data?.occasions || []);
  };

  // products by category
  const fetchProducts = async (slug) => {
    const res = await callPublicApi(`/products?category=${slug}&limit=8`, "GET", undefined);
   
    
    console.log("res in products", res);

    return res.success ? res.data : [];
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchOccasions()]);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!categories.length) return;

    const loadProducts = async () => {
      setProductsLoading(true);
      const map = {};
      for (const cat of categories) {
        map[cat.slug] = await fetchProducts(cat.slug);
      }
      setProductsByCategory(map);
      setProductsLoading(false);
    };

    loadProducts();
  }, [categories]);

  return (
    <main>
      <HomePage />


      {/* ✅ dynamic occasions */}
      <OccasionSlider occasions={occasions} />

      {/* ✅ dynamic categories → products */}

      {categories &&
        categories.map((cat,i) => (
          <section key={cat._id || i} className="my-10">
            {productsLoading || !productsByCategory[cat.slug] ? (
              <ProductSkeleton />
            ) : (
              <ProductCarousel
                title={cat.name}
                products={productsByCategory[cat.slug]}
              />
            )}
          </section>
        ))}

      {/* 🔒 baqi sab same */}
      <HotDeals />
      <BestSelling />
            <AboutAromaFollower />

      {/* <MidnightDeliveryBanner /> */}
      <Testimonials />
    </main>
  );
}
