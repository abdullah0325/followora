'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { callPrivateApi } from '@/services/callApis';
import { useAuth } from '@/hooks/authContext';
import { normalizeImagePath } from '@/lib/utils/normalizeImagePath';

export default function ProductCard({ product }) {
  const { token } = useAuth(); // get token from auth context
  const [isHovered, setIsHovered] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // check if product is in wishlist
  const isInWishlist = wishlistIds.includes(product.id);

  // Add to cart handler
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        // const res = await fetch('/api/cart', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   },
        //   body: JSON.stringify({ productId: product.id, quantity: 1 }),
        // });
        // const data = await res.json();
        const res= await callPrivateApi("/cart/add","POST",{
           productId: product.id, quantity: 1 
        },token)
        if (data.success) toast.success('Added to cart!');
        else toast.error(data.message);
      } else {
        // localStorage fallback
        const stored = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const exists = stored.find((i) => i.id === product.id);
        if (exists) {
          exists.quantity += 1;
        } else {
          stored.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(stored));
        setCartItems(stored);
        toast.success('Added to cart!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    }
  };

  // Wishlist toggle handler
  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const res = await fetch('/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product.id }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          fetchWishlistIds();
        } else toast.error(data.message);
      } else {
        // localStorage wishlist
        const stored = JSON.parse(localStorage.getItem('wishlistIds') || '[]');
        let updated;
        if (stored.includes(product.id)) {
          updated = stored.filter((i) => i !== product.id);
          toast('Removed from wishlist', { icon: '❤️' });
        } else {
          updated = [...stored, product.id];
          toast('Added to wishlist', { icon: '❤️' });
        }
        localStorage.setItem('wishlistIds', JSON.stringify(updated));
        setWishlistIds(updated);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update wishlist');
    }
  };

  const fetchWishlistIds = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setWishlistIds(data.data.items.map((i) => i.id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlistIds();
  }, [token]);

  const getCategorySlug = () => {
    if (product.category) {
      const map = {
        'FOR HER': 'for-her',
        'FOR HIM': 'for-him',
        GIFTS: 'gifts',
        CAKES: 'cakes',
        FLOWERS: 'flowers',
      };
      return map[product.category] || product.category.toLowerCase().replace(/\s+/g, '-');
    }
    return 'products';
  };
  const categorySlug = getCategorySlug();

  return (
    <Link
      href={`/product/${categorySlug}/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        group relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800
        transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl dark:shadow-[0_0_40px_rgba(236,72,153,0.25)]
      "
    >
      {/* 🌸 DISCOUNT */}
      {product.discount > 0 && (
        <div className="
          absolute top-4 right-4 z-20 px-3 py-1 rounded-full
          bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs font-bold shadow-lg
        ">
          {product.discount}% OFF
        </div>
      )}

      {/* 🖼 IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <img
          src={normalizeImagePath(product.image)}
          alt={product.name}
          onError={(e) => (e.currentTarget.src = '/images/fallback.jpg')}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* 🌫 GLASS OVERLAY */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <IconBtn onClick={(e) => console.log('Quick view', product.id)}>
            <FiEye />
          </IconBtn>
          <IconBtn onClick={handleAddToCart}>
            <FiShoppingCart />
          </IconBtn>
          <IconBtn onClick={handleWishlist} active={isInWishlist}>
            <FiHeart />
          </IconBtn>
        </div>
      </div>

      {/* 📝 INFO */}
      <div className="p-5">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-pink-600 dark:text-pink-400 font-bold text-base">AED {product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="text-gray-400 line-through text-xs">AED {product.originalPrice.toFixed(2)}</span>}
        </div>
      </div>
    </Link>
  );
}

/* 🔘 ICON BUTTON */
function IconBtn({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`
        p-3 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg
        ${active ? 'bg-pink-600 text-white shadow-pink-500/50' : 'bg-white/90 dark:bg-zinc-900/80 text-gray-800 dark:text-white'}
        hover:bg-pink-600 hover:text-white hover:scale-110
      `}
    >
      {children}
    </button>
  );
}
