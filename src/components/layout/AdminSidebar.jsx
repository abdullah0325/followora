'use client';

import { useAuth } from '@/hooks/authContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiPackage,
  FiFolder,
  FiCalendar,
  FiClock,
  FiFileText,
  FiLayout,
  FiShoppingBag,
  FiSettings
} from 'react-icons/fi';

const adminMenuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: FiLayout,
  },
  {
    title: 'Products',
    href: '/admin/product',
    icon: FiPackage,
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: FiFolder,
  },
  {
    title: 'Occasions',
    href: '/admin/occasions',
    icon: FiCalendar,
  },
 
  {
    title: 'Blogs',
    href: '/admin/blogs',
    icon: FiFileText,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: FiShoppingBag,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: FiSettings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
    const {isSidebarOpen}=useAuth()
  return (
  <aside
      className={`w-[270px] h-[89vh] fixed bottom-0 pointer-events-auto z-20  bg-white  shadow-lg flex flex-col justify-between ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}
    >      <nav className="p-4 space-y-1">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

