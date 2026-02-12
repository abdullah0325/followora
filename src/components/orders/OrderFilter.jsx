'use client';

import { useState } from 'react';

export default function OrderFilters({ onFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  const handleApply = () => {
    onFilter({ startDate, endDate, status });
  };

  return (
    <div className="flex flex-wrap items-end gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <button onClick={handleApply} className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500">Apply</button>
    </div>
  );
}
