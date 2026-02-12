'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPackage, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAuth } from '@/hooks/authContext';
import { callPrivateApi } from '@/services/callApis';

export default function MyOrders() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated && !loading) { // Wait for auth check
      // router.push('/'); // AuthContext handles redirect usually?
    }

    const fetchOrders = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await callPrivateApi('/orders/my-order', 'GET', null, token);
        if (res.success) {
          setOrders(res.data || []);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token, isAuthenticated, router]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="text-green-600 dark:text-green-400" size={20} />;
      case 'cancelled':
        return <FiXCircle className="text-red-600 dark:text-red-400" size={20} />;
      default:
        return <FiClock className="text-yellow-600 dark:text-yellow-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
        {error.message || 'Failed to load orders'}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <FiPackage className="mx-auto text-gray-400 dark:text-gray-600" size={64} />
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          No orders yet
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Start shopping to see your orders here
        </p>
        <button
          onClick={() => router.push('/products')}
          className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order, i) => {
          const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
          const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <div
              key={order._id || i}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Order #{order.id.slice(0, 8)}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                        order.order_status
                      )}`}
                    >
                      {getStatusIcon(order.order_status)}
                      {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Placed on {formatDate(order.created_at)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {itemCount} item{itemCount > 1 ? 's' : ''} • AED {parseFloat(order.total_amount).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/orders/${order.id}`)}
                    className="px-4 py-2 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    View Details
                  </button>
                  {order.order_status === 'pending' && (
                    <button
                      onClick={async () => {
                        if (confirm('Are you sure you want to cancel this order?')) {
                          // Dispatch cancel order action
                          // await dispatch(updateOrderStatus({ orderId: order.id, status: 'cancelled' }));
                        }
                      }}
                      className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}






