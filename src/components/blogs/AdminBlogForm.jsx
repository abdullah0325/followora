"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { callPrivateApi } from "@/services/callApis";
import { useAuth } from "@/hooks/authContext";
import GradientWrapper from "../ui/Gradient";

export default function BlogForm({ blog, onSuccess }) {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("Ammara Ilyas");
  const [status, setStatus] = useState("published");
  const [image, setImage] = useState(null); // File or string URL
  const [preview, setPreview] = useState(""); // For preview only
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setSlug(blog.slug || "");
      setContent(blog.content || "");
      setTags(blog.tags?.join(", ") || "");
      setStatus(blog.status || "published");
      setImage(blog.image || null);
      setPreview(blog.image || "");
    }
  }, [blog]);

  // Handle image selection locally
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImage(file);

    // Update preview immediately for new file
    setPreview(URL.createObjectURL(file));
  };

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (image instanceof File && preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [image, preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    const payload = new FormData();
    payload.append("title", title);
    payload.append("slug", slug);
    payload.append("content", content);
    payload.append("tags", tags);
    payload.append("status", status);
    payload.append("author", author);

    // Only append image if user selected a new file
    if (image instanceof File) {
      payload.append("image", image);
    }

    try {
      setLoading(true);

      let res;
      if (blog) {
        res = await callPrivateApi(`/blogs/${blog.id}`, "PUT", payload, token);
        if (res?.success) {
          toast.success("Blog updated successfully");
          onSuccess();
        }
      } else {
        res = await callPrivateApi("/blogs", "POST", payload, token);
        if (res?.success) {
          toast.success("Blog created successfully");
          onSuccess();
        }
      }
    } catch (err) {
      const errorMessage = err?.message || "Failed to save blog";
      console.error("[BlogForm] Submit error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-h-[80vh] overflow-y-auto rounded-xl border bg-white shadow-lg"
      >
        {/* HEADER */}
        <GradientWrapper>
          <div className="bg-transparent text-white px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold">
            {blog ? "Update Blog" : "Create Blog"}
          </h2>
        </div>
        </GradientWrapper>

        <div className="p-6 space-y-4">
          {/* TITLE */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block font-medium mb-1">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block font-medium mb-1">Content</label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
           <div>
            <label className="block font-medium mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
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

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 h-28 w-28 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
