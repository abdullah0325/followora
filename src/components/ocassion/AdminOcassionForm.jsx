"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { callPrivateApi } from "@/services/callApis";
import { useAuth } from "@/hooks/authContext";

export default function OccasionForm({ occasion, onSuccess }) {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null); // File or URL
  const [preview, setPreview] = useState(""); // Preview
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (occasion) {
      setName(occasion.name || "");
      setSlug(occasion.slug || "");
      setIsActive(occasion.is_active !== undefined ? occasion.is_active : true);
      setImage(occasion.image || null);
      setPreview(occasion.image || "");
    }
  }, [occasion]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (image instanceof File && preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [image, preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("is_active", isActive);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      if (occasion) {
        const res = await callPrivateApi(
          `/occasions/${occasion.id}`,
          "PUT",
          formData,
          token,
          true
        );
        if (res.success) toast.success("Occasion updated successfully");
      } else {
        const res = await callPrivateApi("/occasions", "POST", formData, token, true);
        if (res.success) toast.success("Occasion created successfully");
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save occasion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-h-[70vh] overflow-y-auto rounded-xl border bg-white shadow-lg"
      >
        {/* HEADER */}
        <div className="bg-pink-500 text-white px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold">
            {occasion ? "Update Occasion" : "Create Occasion"}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {/* NAME */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block font-medium mb-1">Slug (auto-generated)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Leave empty to auto-generate"
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* ACTIVE */}
          <div>
            <label className="block font-medium mb-1">Active</label>
            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value === "true")}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:rounded-md file:border-0
                file:bg-pink-50 file:px-4 file:py-2
                file:font-semibold file:text-pink-600
                hover:file:bg-pink-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 h-28 w-28 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : occasion ? "Update Occasion" : "Create Occasion"}
          </button>
        </div>
      </form>
    </div>
  );
}
