"use client";

export default function ProductDescription({ description }) {
  return (
    <div className="mt-4 border-t pt-4 text-gray-700">
      <h2 className="text-xl font-semibold mb-2">Product Description</h2>
      <p>{description || "No description available."}</p>
    </div>
  );
}
