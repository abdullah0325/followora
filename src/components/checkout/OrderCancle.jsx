'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutCancelPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error('Payment was cancelled.');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <div className="bg-white rounded-xl p-10 shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-red-500">❌ Payment Cancelled</h1>
        <p className="mb-6">Your payment could not be completed. Please try again.</p>
        <button
          onClick={() => router.push('/checkout')}
          className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
        >
          Return to Checkout
        </button>
      </div>
    </div>
  );
}
