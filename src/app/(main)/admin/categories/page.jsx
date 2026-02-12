export const dynamic = 'force-dynamic';
import AdminCategoryPage from '@/components/category/AdminCategoryPage';

export const metadata = {
  title: 'Categories Management | Admin Dashboard',
  description: 'Manage product categories. Create, edit, delete, and organize categories for your products.',
  keywords: ['admin', 'categories', 'product management', 'admin dashboard'],
  openGraph: {
    title: 'Categories Management | Admin Dashboard',
    description: 'Manage product categories',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CategoriesPage() {
  return <AdminCategoryPage />;
}

