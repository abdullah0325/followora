"use client";

import toast, { Toaster } from "react-hot-toast";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async () => {
    try {
      await addToCart(product, 1);
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="flex flex-col gap-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="flex gap-2 text-sm text-gray-600 flex-wrap">
        <span>Category: {product.category}</span>
        <span>Colour: {product.colour}</span>
        <span>Size: {product.size}</span>
        <span>Delivery: {product.delivery}</span>
        <span>Occasion: {product.occasions}</span>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <button
          onClick={handleAddToCart}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Add to Cart
        </button>
        <button
          onClick={handleWishlist}
          className={`p-2 rounded border ${isInWishlist(product.id) ? "bg-pink-500 text-white" : "text-gray-700"}`}
        >
          {isInWishlist(product.id) ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
