import cloudinary from "cloudinary";

const connectCloudinary = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

};


export const deleteImage = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

export const extractPublicId = (url) => {
  const parts = url.split("/");
  const filePart = parts[parts.length - 1]; // "public_id.jpg"
  const fileName = filePart.split(".")[0];
  // Assuming folder 'products' or similar is part of public_id if needed, but simple extraction:
  // Usually better regex needed if folders involved. For now basic:
  return fileName;
};

export default connectCloudinary;
