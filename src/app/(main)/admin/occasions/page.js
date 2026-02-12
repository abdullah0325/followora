// import OccasionManager from '@/components/admin/OccasionManager';
export const dynamic = 'force-dynamic';
import AdminOccasionPage from '@/components/ocassion/AdminOcassionPage';

export const metadata = {
  title: 'Occasions Management | Admin Dashboard',
  description: 'Manage product occasions. Create, edit, delete, and organize occasions like birthday, anniversary, etc.',
  keywords: ['admin', 'occasions', 'product management', 'admin dashboard'],
  openGraph: {
    title: 'Occasions Management | Admin Dashboard',
    description: 'Manage product occasions',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function OccasionsPage() {
  return <AdminOccasionPage />;
}




