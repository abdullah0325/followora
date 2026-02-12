import MyOrdersTable from '@/components/checkout/MyOrderTable';
import { LoginHeading } from '@/components/ui/Heading';

export const metadata = {
  title: 'My Orders - Aroma Flowers',
  description: 'View your order history',
};

export default function MyOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <LoginHeading text="My Orders" />
      <div className="mt-8">
        <MyOrdersTable />
      </div>
    </div>
  );
}
