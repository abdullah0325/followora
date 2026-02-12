export const dynamic = 'force-dynamic';

import OrderSuccess from '@/components/checkout/OrderSuccess';

export const metadata = {
  title: 'Order Success - Aroma Flowers',
  description: 'Your order has been placed successfully',
};

import { Suspense } from 'react';

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <OrderSuccess />
    </Suspense>
  );
}






