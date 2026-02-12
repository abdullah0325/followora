"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { callPrivateApi, callPublicApi } from "@/services/callApis";
import Image from "next/image";
import { useAuth } from "@/hooks/authContext";

export default function ProductForm({ product = null, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    occasions: "",
    gender: "",
    colour: "",
    size: "",
    delivery: "",
    description: "",
    seo_title: "",
    seo_description: "",
    premium: false,
    image: null,
    images: [],
    badge: "",
    rating: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL"]);
  // Use canonical delivery enum values that match the Product schema
  const [deliveries, setDeliveries] = useState(["same-day", "night-time", "on-delivery", "express"]);
  const [badges, setBadges] = useState(["top-selling", "new-arrival", "featured"]);
  const [genders] = useState(["her", "him", "both", "female", "male", "unisex"]);
  const { token } = useAuth();
  // Fetch dynamic options
  useEffect(() => {
    async function fetchOptions() {
      try {
        const catRes = await callPublicApi("/categories", "GET", undefined);
        // API returns { data: { categories: [...], pagination: {...} } }
        setCategories(catRes.data?.categories || []);

        const occRes = await callPublicApi("/occasions", "GET", undefined);
        setOccasions(occRes.data?.occasions || []);
      } catch (err) {
        console.error("Error fetching dropdown options:", err);
      }
    }
    fetchOptions();
  }, []);

  // Fill form if editing
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        price: product.price || "",
        // product.category may be an ID string or populated object
        category: product.category?.id || product.category || "",
        // occasions may be an array; pick first for single-selection field
        occasions: Array.isArray(product.occasions)
          ? (product.occasions[0]?.id || product.occasions[0] || "")
          : (product.occasions?.id || product.occasions || ""),
        gender: product.gender || "",
        colour: product.colour || "",
        size: product.size || "",
        delivery: product.delivery || "",
        description: product.description || "",
        seo_title: product.seo_title || "",
        seo_description: product.seo_description || "",
        premium: product.premium || false,
        image: product.image || null,
        images: product.images || [],
        badge: product.badge || "",
        rating: product.rating || "",
      });

      if (product.images) setImagePreviews(product.images);
      if (product.image) setMainImagePreview(product.image);
    }
  }, [product]);

  const handleChange = (key, value) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };

      // Auto-generate slug if creating new product
      if (key === "name" && !product) {
        const slugified = value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        updated.slug = slugified;
      }
      return updated;
    });
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleChange("image", file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    handleChange("images", files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "images") {
          form.images.forEach((file) => formData.append("images", file));
        } else if (key === "image") {
          if (form.image) formData.append("image", form.image);
        } else {
          formData.append(key, form[key]);
        }
      });


      console.log("formdata",formData);
      
      const endpoint = product ? `/products/${product.id}` : "/products";
      const method = product ? "PUT" : "POST";

      // const token = localStorage.getItem("token");
      const res = await callPrivateApi(endpoint, method, formData, token);

      toast.success(res.message || "Product saved successfully");
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      console.error('Product save error:', err);
      // Handle different error formats
      const errorMessage = err?.message || err?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto overflow-y-auto h-[90vh] border rounded-lg shadow-md bg-white">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Slug */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Price & Badge */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            required
          />
          <select
            value={form.badge}
            onChange={(e) => handleChange("badge", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          >
            <option value="">No Badge</option>
            {badges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Category & Occasion */}
        <div className="flex gap-4">
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories &&
            categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.occasions}
            onChange={(e) => handleChange("occasions", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          >
            <option value="">Select Occasion</option>
            {occasions &&
            occasions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender & Color */}
        <div className="flex gap-4">
          <select
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={form.colour}
            onChange={(e) => handleChange("colour", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
        </div>

        {/* Size & Delivery */}
        <div className="flex gap-4">
          <select
            value={form.size}
            onChange={(e) => handleChange("size", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          >
            <option value="">Select Size</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={form.delivery}
            onChange={(e) => handleChange("delivery", e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          >
            <option value="">Select Delivery</option>
            {deliveries.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Description & Rating */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          placeholder="Rating (0-5)"
          value={form.rating}
          min={0}
          max={5}
          step={0.1}
          onChange={(e) => handleChange("rating", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        {/* SEO */}
        <input
          type="text"
          placeholder="SEO Title"
          value={form.seo_title}
          onChange={(e) => handleChange("seo_title", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="SEO Description"
          value={form.seo_description}
          onChange={(e) => handleChange("seo_description", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Main Image */}
        <div>
          <label className="block mb-1 font-semibold">Main Image</label>
          {mainImagePreview && (
            <Image src={mainImagePreview} alt="Main" width={100} height={100} className="mb-2" />
          )}
          <input type="file" accept="image/*" onChange={handleMainImage} />
        </div>

        {/* Additional Images */}
        <div>
          <label className="block mb-1 font-semibold">Additional Images</label>
          <div className="flex gap-2 overflow-x-auto mb-2">
            {imagePreviews.map((src, i) => (
              <Image key={i} src={src} alt={`img-${i}`} width={80} height={80} className="rounded" />
            ))}
          </div>
          <input type="file" accept="image/*" multiple onChange={handleMultipleImages} />
        </div>

        {/* Premium */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.premium}
            onChange={(e) => handleChange("premium", e.target.checked)}
          />
          <span>Premium Product</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
