"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";
import { callPrivateApi } from "@/services/callApis";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  /* ===============================
     LOCAL STORAGE HELPERS
  =============================== */
  const getLocalCart = () => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("cart")) || [];
  };

  const setLocalCart = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    const normalizedItems = items.map((item) => ({
      ...item,
      cartItemId: item.productId || item._id || item.id,
    }));
    setCartItems(normalizedItems);
  };

  /* ===============================
     FETCH CART
  =============================== */
  const fetchCart = async () => {
    // ❌ Guest user
    if (!token) {
      const items = getLocalCart().map((item) => ({
        ...item,
        cartItemId: item.productId || item._id || item.id,
      }));
      console.log("items", items);

      setCartItems(items);
      return;
    }

    // ✅ Logged in user
    setLoading(true);
    try {
      const res = await callPrivateApi("/cart", "GET", null, token);
      console.log("res innvcst", res);

      if (res.success) {
        // Normalize API data to match local cart structure
        const normalizedItems = (res.data.items || []).map((item) => ({
          ...item,
          cartItemId: item._id || item.id, // Cart Item ID
          productId: item.product?._id || item.product?.id,
          name: item.product?.title || item.product?.name || item.name,
          image: item.product?.image || item.product?.image_url || item.image,
          price: item.product?.price || item.price,
          quantity: item.quantity,
          product: item.product // Keep full product just in case
        }));
        setCartItems(normalizedItems);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  /* ===============================
     ADD TO CART
  =============================== */
  const addToCart = async (product, quantity = 1) => {
    const productId = product.id || product._id;

    // ❌ Guest user
    if (!token) {
      const localCart = getLocalCart();
      const existing = localCart.find(
        (item) => (item.productId || item._id) === productId
      );

      let updatedCart;

      if (existing) {
        updatedCart = localCart.map((item) =>
          (item.productId || item._id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [
          ...localCart,
          {
            ...product,
            productId,
            quantity,
          },
        ];
      }

      setLocalCart(updatedCart);
      toast.success("Added to cart");
      return;
    }

    // ✅ Logged in user
    try {
      const res = await callPrivateApi(
        "/cart/add",
        "POST",
        { productId, quantity },
        token
      );   
      console.log("add cart",res);
      

      if (res.success) {
        toast.success(res.message || "Added to cart");
        fetchCart();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  /* ===============================
     UPDATE CART ITEM
  =============================== */
  const updateCartItem = async (cartItemId, newQuantity) => {
    // ❌ Guest user
    if (!token) {
      const localCart = getLocalCart();

      const updatedCart = localCart.map((item) =>
        (item.productId || item._id) === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      );

      setLocalCart(updatedCart);
      return;
    }

    // ✅ Logged in user
    try {
      const item = cartItems.find(
        (i) => i.id === cartItemId || i.cartItemId === cartItemId
      );
      if (!item || item.quantity === newQuantity) return;

      const action = newQuantity > item.quantity ? "increase" : "decrease";

      const res = await callPrivateApi(
        "/cart/update",
        "POST",
        { cartItemId, action },
        token
      );
 console.log("update cart itewem",res);
 
      if (res.success) fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  /* ===============================
     REMOVE CART ITEM
  =============================== */
  const removeCartItem = async (cartItemId) => {
    // ❌ Guest user
    if (!token) {
      const localCart = getLocalCart().filter(
        (item) => (item.productId || item._id) !== cartItemId
      );

      setLocalCart(localCart);
      toast.success("Removed from cart");
      return;
    }

    // ✅ Logged in user
    try {
      const res = await callPrivateApi(
        "/cart/update",
        "POST",
        { cartItemId, action: "delete" },
        token
      );
 console.log("remocve caet",res);
 
      if (res.success) fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
