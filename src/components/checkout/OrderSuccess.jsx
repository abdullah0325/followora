'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/authContext';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { callPrivateApi } from '@/services/callApis';

export default function CheckoutSuccessPage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const sessionId = searchParams?.get('session_id');
 console.log("session id",sessionId);
 
  useEffect(() => {
    if (authLoading) return;

    if (!token) {
      toast.error('Please login first');
      router.push('/auth/login');
      return;
    }

    // Clear cart after successful payment
    const clearCart = async () => {
      try {
        const data=await callPrivateApi("/cart/clear","DELETE",undefined,token)
        console.log("data cart clear", data);
        
        if (data.success) {
          toast.success('Payment successful! Cart cleared.');
        } else {
          toast.error('Payment successful but failed to clear cart.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong clearing cart.');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) clearCart();
  }, [sessionId, token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-rose-500 text-white p-5">
      {loading ? (
        <p className="text-lg font-semibold">Processing your order...</p>
      ) : (
        <div className="bg-white text-gray-900 rounded-xl p-10 shadow-lg text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">🎉 Payment Successful!</h1>
          <p className="mb-6">Thank you for your purchase. Your order is confirmed.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-pink-600 hover:bg-pink-500 text-white py-3 px-6 rounded-lg font-semibold transition-all"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
