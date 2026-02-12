'use client';

import Link from 'next/link';
import {
  FiPackage,
  FiFolder,
  FiCalendar,
  FiClock,
  FiFileText,
  FiTrendingUp
} from 'react-icons/fi';

const stats = [
  {
    title: 'Total Products',
    value: '0',
    icon: FiPackage,
    color: 'bg-blue-500',
    href: '/admin/product/add-product'
  },
  {
    title: 'Categories',
    value: '0',
    icon: FiFolder,
    color: 'bg-green-500',
    href: '/admin/categories'
  },
  {
    title: 'Occasions',
    value: '0',
    icon: FiCalendar,
    color: 'bg-purple-500',
    href: '/admin/occasions'
  },
  {
    title: 'Delivery Times',
    value: '0',
    icon: FiClock,
    color: 'bg-orange-500',
    href: '/admin/delivery-times'
  },
  {
    title: 'Blogs',
    value: '0',
    icon: FiFileText,
    color: 'bg-pink-500',
    href: '/admin/blogs'
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to the admin panel. Manage your products, categories, and more.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/product/add-product"
            className="flex items-center gap-3 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <FiPackage size={20} className="text-pink-600 dark:text-pink-400" />
            <span className="text-gray-700 dark:text-gray-300">Add New Product</span>
          </Link>
          <Link
            href="/admin/blogs"
            className="flex items-center gap-3 p-4 border border-gray-200 dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <FiFileText size={20} className="text-pink-600 dark:text-pink-400" />
            <span className="text-gray-700 dark:text-gray-300">Add New Blog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}






