'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/authContext';
import { FiLogOut, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, logout, isAuthenticated } = useAuth();

  const [localUser, setLocalUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Only use local storage user if context user is not available yet
    // or as a fallback
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setLocalUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }, []);

  const currentUser = user || localUser;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // AuthContext handles redirect
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // 🔒 Not logged in
  if (!isAuthenticated && !localUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg text-center">
          <FiUser className="w-12 h-12 mx-auto text-pink-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">My Account</h1>
          <p className="text-gray-500 mb-6">Please login to continue</p>

          <Link
            href="/auth/login"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Logged in
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-bold text-xl text-pink-600">
            {currentUser?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">
              {currentUser?.firstName} {currentUser?.lastName || ''}
            </h2>
            <p className="text-pink-100">Premium User</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <FiMail className="text-pink-500" />
              <span className="text-sm font-semibold">Email</span>
            </div>
            <p className="text-gray-700 dark:text-gray-200 break-all">
              {currentUser?.email || 'N/A'}
            </p>
          </div>

          {/* Phone */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <FiPhone className="text-pink-500" />
              <span className="text-sm font-semibold">Phone</span>
            </div>
            <p className="text-gray-700 dark:text-gray-200">
              {currentUser?.phone || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t">
          <Link
            href="/orders"
            className="block mb-3 text-center bg-blue-100 text-blue-700 py-2 rounded-lg"
          >
            View My Orders
          </Link>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut || loading}
            className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 py-2 rounded-lg disabled:opacity-50"
          >
            <FiLogOut />
            {isLoggingOut || loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
