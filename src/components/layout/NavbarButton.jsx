"use client";

import { useState } from "react";
import { useCart } from "@/hooks/CartContext";
import { FaWhatsapp } from "react-icons/fa";

import WishlistSidebar from "./WishlistSidebar";
import CartSidebar from "./SidebarCart";
import GradientWrapper from "../ui/Gradient";
export default function NavbarButtons() {
  const { cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const whatsappNumber = "923278759451"; // apna number
  const message = "Hello, I need help";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="flex items-center gap-2 sm:gap-4 relative">
      {/* 🛒 CART */}
      <div>
        <button
          className="relative p-2 bg-gray-100  rounded-full hover:bg-gray-300  transition"
          onClick={() => setCartOpen(true)}
        >
          🛒
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* ❤️ WISHLIST */}
      <div>
        <button
          className="p-2 bg-gray-100   hover:bg-gray-300  rounded-full  transition"
          onClick={() => setWishlistOpen(true)}
        >
          ❤️
        </button>
      </div>

      {/* 💬 WHATSAPP */}
      <div>
        <button
          onClick={() => window.open(whatsappLink, "_blank")}
          className="p-2 bg-gray-100  rounded-full hover:bg-gray-300 transition"
        >
          <FaWhatsapp className="text-green-500 text-xl" />
        </button>
      </div>

      {/* SIDEBARS */}
      <CartSidebar open={cartOpen} setOpen={setCartOpen} />
      <WishlistSidebar open={wishlistOpen} setOpen={setWishlistOpen} />
    </div>
  );
}
