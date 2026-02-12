"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { callPrivateApi } from "@/services/callApis";
import CategoryForm from "./AdminCategoryForm";
import { useAuth } from "@/hooks/authContext";
import DashboardLoading from "@/components/ui/DashboardLoading";
import GradientWrapper from "../ui/Gradient";
import { HeroHeading } from "../ui/Heading";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const { token } = useAuth()
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await callPrivateApi("/categories", "GET", null, token);
      // Fix: extract array from response
      setCategories(res.data?.categories || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await callPrivateApi(`/categories/${id}`, "DELETE", null, token);
      toast.success(res.message || "Category deleted successfully");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditCategory(null);
    fetchCategories();
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <HeroHeading text1="Categories" />
        <GradientWrapper>
          <button
            onClick={() => {
              setEditCategory(null);
              setShowForm(true);
            }}
            className="bg-transparent text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Add New Category
          </button>
        </GradientWrapper>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded shadow-lg p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <CategoryForm category={editCategory} onSuccess={handleFormSuccess} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-gray-300 rounded shadow">
        <table className="w-full table-auto border border-gray-300-collapse">
          <thead className="text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40">
            <tr>
              <th className="border border-gray-300 px-2 py-3">Name</th>
              <th className="border border-gray-300 px-2 py-3">Slug</th>
              <th className="border border-gray-300 px-2 py-3">Active</th>
              <th className="border border-gray-300 px-2 py-3">Created At</th>
              <th className="border border-gray-300 px-2 py-3">Updated At</th>
              <th className="border border-gray-300 px-2 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">
                  <DashboardLoading />
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((c, i) => (
                <tr key={c._id || i} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-1">{c.name || "—"}</td>
                  <td className="border border-gray-300 px-2 py-1">{c.slug || "—"}</td>
                  <td className="border border-gray-300 px-2 py-1">{c.is_active ? "Yes" : "No"}</td>
                  <td className="border border-gray-300 px-2 py-1">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-2 py-1">{new Date(c.updated_at).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-2 py-1 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-pink-600 text-white px-2 py-1 rounded hover:bg-pink-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-pink-600 text-white px-2 py-1 rounded hover:bg-pink-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
