'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/authContext';
import { callPrivateApi } from '@/services/callApis';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function MyOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Default true to prevent flash
  const { token, loading: authLoading } = useAuth();

  const fetchOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await callPrivateApi('/orders/my-order', 'GET', null, token);
      if (res.success) {
        // Fix: Access data.orders based on API response structure
        setOrders(res.data?.orders || []);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch your orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && token) {
      fetchOrders();
    } else if (!authLoading && !token) {
      setLoading(false); // Stop loading if no auth
    }
  }, [token, authLoading]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading orders...
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-gray-50">
        <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
        <Link href="/" className="text-pink-600 font-semibold hover:underline">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                  {order._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-col gap-1">
                    {order.cartItems?.map((item, idx) => (
                      <span key={idx} className="truncate max-w-xs">
                        {item.product_id?.name || 'Create Custom Product'} (x{item.quantity})
                      </span>
                    ))}
                    {/* Fallback for different data structure */}
                    {!order.cartItems && order.products?.map((p, idx) => (
                      <span key={idx} className="truncate max-w-xs">
                        {p.name || 'Product'} (x{p.quantity || 1})
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  AED {order.totalAmount?.toFixed(2) || order.total?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-gray-500">#{order._id.slice(-6).toUpperCase()}</span>
                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="border-t border-b border-gray-100 py-2 space-y-1">
              {order.cartItems?.map((item, idx) => (
                <div key={idx} className="text-sm text-gray-800 flex justify-between">
                  <span className="truncate">{item.product_id?.name || 'Product'}</span>
                  <span className="text-gray-500">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-sm font-medium text-gray-600">Total</span>
              <span className="text-lg font-bold text-pink-600">
                AED {order.totalAmount?.toFixed(2) || order.total?.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
      {status || 'Pending'}
    </span>
  );
}
