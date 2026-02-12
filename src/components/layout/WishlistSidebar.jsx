"use client";

import Image from "next/image";
import { useWishlist } from "@/hooks/WishlistContext";
import { LoginHeading } from "../ui/Heading";
export default function WishlistSidebar({ open, setOpen }) {
  const { wishlistItems } = useWishlist();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform z-50 ${open ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="flex justify-between py-6 items-center p-4 border-b">
        <LoginHeading text="Wishlist" />
        <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <div className="overflow-y-scroll  ">{wishlistItems.length === 0 ? (
        <div className="p-4">No items in wishlist</div>
      ) : (
        <div className="p-4 flex flex-col gap-4 h-full">
          {wishlistItems.map((item,i) => (
            <div key={item.id || i} className="flex gap-3 items-center border-b pb-2">
              <Image src={item.image} width={60} height={60} alt={item.name} className="object-contain" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${Number(item.price || 0).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}</div>
    </div>
  );
}
