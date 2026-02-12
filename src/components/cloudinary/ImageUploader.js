// lib/cloudinary.js

import { v2 as cloudinary } from "cloudinary";

/* ==============================
   CLOUDINARY CONFIG
================================ */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ==============================
   UPLOAD IMAGE
================================ */
/**
 * @param {File | Buffer | string} file
 * @param {string} folder
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadImage(file, folder = "default") {
  if (!file) throw new Error("File is required");

  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/* ==============================
   DELETE IMAGE
================================ */
export async function deleteImage(publicId) {
  if (!publicId) throw new Error("Public ID is required");

  return await cloudinary.uploader.destroy(publicId);
}

/* ==============================
   GET PUBLIC ID FROM URL
================================ */
export function getPublicIdFromUrl(url) {
  if (!url) return null;

  const parts = url.split("/upload/");
  if (parts.length < 2) return null;

  return parts[1].replace(/\.[^/.]+$/, "");
}



/* ==============================
   UPLOAD MULTIPLE IMAGES
================================ */
export async function uploadMultipleImages(files = [], folder = "default") {
  if (!Array.isArray(files) || files.length === 0) return [];

  const uploadPromises = files.map(async (file) => {
    if (!file) return null;

    const buffer = file instanceof Buffer ? file : Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder,
      resource_type: "image",
    });

    return { url: result.secure_url, publicId: result.public_id };
  });

  return Promise.all(uploadPromises);
}


export async function deleteMultipleImages(publicIds = []) {
  if (!Array.isArray(publicIds) || publicIds.length === 0) return;

  const deletePromises = publicIds.map((id) => id && cloudinary.uploader.destroy(id));
  return Promise.all(deletePromises);
}
