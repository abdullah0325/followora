"use client";

import { useState } from "react";
import { useCart } from "@/hooks/CartContext";
import Image from "next/image";
import { LoginHeading } from "../ui/Heading";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartSidebar({ open, setOpen }) {
  const router=useRouter()
  const { cartItems, updateCartItem, removeCartItem, loading } = useCart();
 const handleCheckoutRouting=()=>{
  setOpen(false)
  router.push("/checkout")
 }
  return (
    <div
      className={`fixed top-0 right-0 shadow-lg h-full w-96 bg-white shadow-lg transform transition-transform z-50 ${open ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="flex justify-between  items-center pt-14 p-4 border-b">
        <LoginHeading text="Your Cart" />
        <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <div className="overflow-y-scroll h-[70%]">{loading ? (
        <div className="p-4">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="p-4">Your cart is empty</div>
      ) : (
        <div className="p-4 flex flex-col gap-4  h-full">
          {cartItems.map((item,i) => (
            <div key={item.cartItemId || i} className="flex gap-3 items-center border-b pb-2">
              <Image src={item.image} width={60} height={60} alt={item.name} className="object-contain" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${Number(item.price || 0).toFixed(2)}</p>
                <div className="flex gap-2 mt-1 items-center">
                  <button
                    onClick={() => updateCartItem(item.cartItemId, item.quantity - 1)}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item.cartItemId, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeCartItem(item.cartItemId)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}</div>
      <div>
           <button onClick={handleCheckoutRouting}
                           className="w-full border-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40 flex items-center justify-center disabled:opacity-60"

          >
            Checkout
          </button>
      </div>
    </div>
  );
}
