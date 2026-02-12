"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import OccasionForm from "./AdminOcassionForm";
import { callPrivateApi } from "@/services/callApis";
import Image from "next/image";
import { useAuth } from "@/hooks/authContext";
import DashboardLoading from "@/components/ui/DashboardLoading";
import { HeroHeading } from "../ui/Heading";
import GradientWrapper from "../ui/Gradient";

export default function AdminOccasionPage() {
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editOccasion, setEditOccasion] = useState(null);
  const { token } = useAuth()
  const fetchOccasions = async () => {
    try {
      setLoading(true);
      const res = await callPrivateApi(
        "/occasions",
        "GET",
        null,
        token
      );

      // Ensure we always get an array
      setOccasions(res.data?.occasions || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch occasions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOccasions();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this occasion?")) return;
    try {
      const res = await callPrivateApi(
        `/occasions/${id}`,
        "DELETE",
        null,
        token
      );
      toast.success(res.message || "Occasion deleted successfully");
      fetchOccasions();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete occasion");
    }
  };

  const handleEdit = (occasion) => {
    setEditOccasion(occasion);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditOccasion(null);
    fetchOccasions();
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Occasions</h1>
        <HeroHeading text1="Occasions" />
        <GradientWrapper>

          <button
            onClick={() => {
              setEditOccasion(null);
              setShowForm(true);
            }}
            className="bg-transparent text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Add New Occasion
          </button>
        </GradientWrapper>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded shadow-lg p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <OccasionForm occasion={editOccasion} onSuccess={handleFormSuccess} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-gray-300 rounded shadow">
        <table className="w-full table-auto border border-gray-300-collapse">
          <thead className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40 text-white">
            <tr>
              <th className="border border-gray-300 px-2 py-3">Image</th>
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
                <td colSpan="7">
                  <DashboardLoading />
                </td>
              </tr>
            ) : occasions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No occasions found
                </td>
              </tr>
            ) : (
              occasions.map((o, i) => (
                <tr key={o._id || i} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-1">
                    {o.image ? (
                      <Image
                        src={`/${o.image}`}
                        alt={o.name || "Occasion Image"}
                        width={50}
                        height={50}
                        className="object-cover rounded"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">{o.name || "—"}</td>
                  <td className="border border-gray-300 px-2 py-1">{o.slug || "—"}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {o.is_active !== undefined ? (o.is_active ? "Yes" : "No") : "—"}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {o.updated_at ? new Date(o.updated_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 flex gap-2">
                    <button
                      onClick={() => handleEdit(o)}
                      className="bg-pink-600 text-white px-2 py-1 rounded hover:bg-pink-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(o.id)}
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
