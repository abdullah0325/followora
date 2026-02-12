'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderFilters from './OrderFilters';
import { toast } from 'react-hot-toast';
import DashboardLoading from '@/app/admin/loading';

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const fetchOrders = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`/api/orders?${params}`);
      if (data.success) {
        setOrders(data.data.orders);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(filters);
  }, [filters]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const { data } = await axios.delete(`/api/orders/${id}`);
      if (data.success) {
        toast.success('Order deleted');
        fetchOrders(filters);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete order');
    }
  };

  return (
    <div>
      <OrderFilters onFilter={setFilters} />

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Products</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Created At</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
             <DashboardLoading/>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10">No orders found</td>
              </tr>
            ) : (
              orders.map((order,i) => (
                <tr key={order._id || i}>
                  <td className="px-6 py-4 text-sm">{order._id}</td>
                  <td className="px-6 py-4 text-sm">{order.user_id}</td>
                  <td className="px-6 py-4 text-sm">
                    {order.products.map(p => `${p.name} (${p.quantity})`).join(', ')}
                  </td>
                  <td className="px-6 py-4 text-sm">AED {order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">{order.status}</td>
                  <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => toast('View order')}>View</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => handleDelete(order._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
