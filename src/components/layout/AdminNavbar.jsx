'use client';

import Link from 'next/link';
import { FiLogOut, FiUser, FiHome, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import { RiMenuUnfold4Line } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/authContext';

export default function AdminNavbar() {
  const { isSidebarOpen, toggleSidebar, user, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          {/* Logo & Title */}
          <div className="flex items-center gap-4 ">
            <Link href="/admin" className="text-xl px-4 font-bold text-gray-900 dark:text-white">
              Admin Panel
            </Link>
            <button
              button="true"
              onClick={toggleSidebar}
              className="p-2 text-xl mx-4 bg-gray-200 rounded-full transition-all ease-in-out duration-300 text-black hover:text-white hover:bg-pink-600"
            >
              {isSidebarOpen ? <RiMenuUnfold4Line /> : <LuMenu />}
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              title="Go to Home"
            >
              <FiHome size={20} />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              <FiUser size={18} />
              <span className="hidden sm:inline">{user?.name || user?.email || 'Admin'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
              title="Logout"
            >
              <FiLogOut size={18} />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

