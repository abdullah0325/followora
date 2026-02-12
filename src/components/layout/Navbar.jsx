'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import NavbarButtons from './NavbarButton';
import { useAuth } from '@/hooks/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">

      {/* MAIN BAR */}
      <div className="max-w-7xl mx-auto py-2 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* LOGO */}
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="w-[200px]" />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/product" className="nav-link">Products</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            {isAdmin && (
              <Link href="/admin" className="text-xs xl:text-sm bg-pink-50 dark:bg-zinc-800 px-3 py-1 rounded-lg font-medium hover:text-pink-600">
                Admin
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* USER */}
            {!user ? (
              <Link href="/auth/login" className="p-2 hover:text-pink-600 hidden sm:block">
                <FiUser size={18} />
              </Link>
            ) : (
              <div className="relative group hidden sm:block">
                <button className="p-2 flex items-center gap-1 hover:text-pink-600">
                  <FiUser size={18} />
                  <span className="text-sm font-medium truncate max-w-[90px]">
                    {user.firstName || 'Account'}
                  </span>
                </button>

                {/* DROPDOWN */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-2 text-sm border-b truncate">{user.email}</div>
                  <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700">My Account</Link>
                  {isAdmin && <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700">Admin Panel</Link>}
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700 flex items-center gap-2">
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              </div>
            )}

            <NavbarButtons />

            {/* MOBILE ICON */}
            <button
              onClick={handleMenuToggle}
              className="lg:hidden p-2 hover:text-pink-600 relative z-50 transition-colors"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU RIGHT SLIDE */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-zinc-900 shadow-xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={handleMenuToggle} className="p-2 hover:text-pink-600">
            <FiX size={24} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-3 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-lg rounded-b-2xl">
          {/* Home */}
          <Link
            href="/"
            onClick={handleMenuLinkClick}
            className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-zinc-800 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-medium text-base"
          >
            Home
          </Link>

          {/* Products */}
          <Link
            href="/product"
            onClick={handleMenuLinkClick}
            className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-zinc-800 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-medium text-base"
          >
            All Products
          </Link>

          {/* About */}
          <Link
            href="/about"
            onClick={handleMenuLinkClick}
            className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-zinc-800 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-medium text-base"
          >
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={handleMenuLinkClick}
            className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-zinc-800 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-medium text-base"
          >
            Contact
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            onClick={handleMenuLinkClick}
            className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-zinc-800 hover:text-pink-600 dark:hover:text-pink-400 transition-all font-medium text-base"
          >
            Blog
          </Link>

          {/* Admin Panel */}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={handleMenuLinkClick}
              className="block px-4 py-3 rounded-xl bg-pink-50 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 font-medium hover:bg-pink-100 dark:hover:bg-zinc-700 transition-all text-base"
            >
              Admin Panel
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}
