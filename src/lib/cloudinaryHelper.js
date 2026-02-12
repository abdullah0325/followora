import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
export const configureCloudinary = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn('[Cloudinary] Not fully configured');
    return false;
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return true;
};

// Check config
export const isCloudinaryConfigured = () => {
  return !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
};

/**
 * Upload a single image buffer or path
 * @param {Buffer|string} file Buffer or local file path
 * @param {Object} options folder, public_id
 */
export const uploadImage = async (file, options = {}) => {
  if (!isCloudinaryConfigured()) throw new Error('Cloudinary not configured');

  const uploadOptions = {
    folder: options.folder || 'default_folder',
    public_id: options.public_id || undefined,
    resource_type: 'image',
    overwrite: true,
  };

  let result;
  if (Buffer.isBuffer(file)) {
    result = await cloudinary.uploader.upload_stream(uploadOptions, (err, res) => {
      if (err) throw err;
      return res;
    });

    // Better: use promise wrapper for upload_stream
    result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
      stream.end(file);
    });
  } else if (typeof file === 'string') {
    result = await cloudinary.uploader.upload(file, uploadOptions);
  } else {
    throw new Error('Invalid file type, must be Buffer or file path string');
  }

  return {
    url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
};

/**
 * Upload multiple images
 * @param {Array<Buffer|string>} files
 * @param {Object} options
 */
export const uploadMultipleImages = async (files = [], options = {}) => {
  if (!Array.isArray(files) || files.length === 0) return [];
  const results = [];
  for (const file of files) {
    const uploaded = await uploadImage(file, options);
    results.push(uploaded);
  }
  return results;
};

/**
 * Delete single image by public_id
 */
export const deleteImage = async (public_id) => {
  if (!public_id) throw new Error('public_id required for delete');
  const result = await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
  return result;
};

/**
 * Delete multiple images by array of public_ids
 */
export const deleteMultipleImages = async (publicIds = []) => {
  if (!Array.isArray(publicIds) || publicIds.length === 0) return [];
  const results = [];
  for (const id of publicIds) {
    const res = await deleteImage(id);
    results.push(res);
  }
  return results;
};
