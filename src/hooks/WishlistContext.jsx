"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";
import { callPrivateApi } from "@/services/callApis";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { token } = useAuth();

  /* ===============================
     LOCAL STORAGE HELPERS
  =============================== */
  const getLocalWishlist = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("wishList")) || [];
  };

  /* ===============================
     FETCH WISHLIST
  =============================== */
  const fetchWishlist = async () => {
    // ❌ Guest user
    if (!token) {
      setWishlistItems(getLocalWishlist());
      return;
    }

    // ✅ Logged in user
    try {
      const res = await callPrivateApi("/wishlist", "GET", null, token);
      console.log("res wish list",res);
      
      if (res.success) setWishlistItems(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  /* ===============================
     TOGGLE WISHLIST
  =============================== */
  const toggleWishlist = async (product) => {
    const productId = product.id || product._id;

    // ❌ Guest user
    if (!token) {
      const localWishlist = getLocalWishlist();

      const exists = localWishlist.some(
        (item) => (item.id || item._id) === productId
      );

      let updatedWishlist;

      if (exists) {
        updatedWishlist = localWishlist.filter(
          (item) => (item.id || item._id) !== productId
        );
        toast.success("Removed from wishlist");
      } else {
        updatedWishlist = [...localWishlist, product];
        toast.success("Added to wishlist");
      }

      localStorage.setItem("wishList", JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
      return;
    }

    // ✅ Logged in user
    try {
      const res = await callPrivateApi(
        "/wishlist",
        "POST",
        { productId },
        token
      );

      if (res.success) {
        toast.success(res.message);
        fetchWishlist();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
    }
  };

  /* ===============================
     CHECK WISHLIST ITEM
  =============================== */
  const isInWishlist = (productId) =>
    wishlistItems.some(
      (item) => (item.id || item._id) === productId
    );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        fetchWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
