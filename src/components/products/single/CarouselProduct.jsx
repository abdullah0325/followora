"use client";

import { useState } from "react";
import Image from "next/image";
import { normalizeImagePath } from "@/lib/utils/normalizeImagePath";

export default function Carousel({ images }) {
  const [mainImage, setMainImage] = useState(images?.[0] || "");

  if (!images || images.length === 0) return <div className="text-gray-400">No images</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="border rounded p-2 h-[400px] flex items-center justify-center">
        <Image src={normalizeImagePath(mainImage)} alt="Main Image" width={400} height={400} className="object-contain" />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`border rounded p-1 cursor-pointer ${mainImage === img ? "border-pink-500" : ""}`}
            onClick={() => setMainImage(img)}
          >
            <Image src={normalizeImagePath(img)} alt={`thumb-${idx}`} width={70} height={70} className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
