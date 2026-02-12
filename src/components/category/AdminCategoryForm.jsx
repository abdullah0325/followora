"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { callPrivateApi } from "@/services/callApis";
import { useAuth } from "@/hooks/authContext";

export default function CategoryForm({ category, onSuccess }) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
 const {token}=useAuth()
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setIsActive(category.is_active !== undefined ? category.is_active : true);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    const payload = { name, is_active: isActive };

    try {
      setLoading(true);
      if (category) {
        await callPrivateApi(`/categories/${category.id}`, "PUT", payload, token);
        toast.success("Category updated successfully");
      } else {
        await callPrivateApi("/categories", "POST", payload, token);
        toast.success("Category created successfully");
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
      <div>
        <label className="block font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Active</label>
        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value === "true")}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        {category ? "Update Category" : "Add Category"}
      </button>
    </form>
  );
}
