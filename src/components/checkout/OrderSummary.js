'use client';

import { useCart } from '@/hooks/CartContext';
import Image from 'next/image';
import { FiPackage } from 'react-icons/fi';

export default function OrderSummary() {
  const { cartItems } = useCart();

  // Calculate totals locally since context might not provide all breakdown
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 20; // Example logic match
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05;
  };

  const finalSubtotal = calculateSubtotal();
  const finalShipping = calculateShipping();
  const finalTax = calculateTax();
  const finalTotal = finalSubtotal + finalShipping + finalTax;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiPackage size={20} />
        Order Summary
      </h2>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-lg flex-shrink-0 relative overflow-hidden">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Qty: {item.quantity}
              </p>
              <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 mt-1">
                AED {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 space-y-3">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotal</span>
          <span>AED {finalSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Shipping</span>
          <span>
            {finalShipping === 0 ? (
              <span className="text-green-600 dark:text-green-400">Free</span>
            ) : (
              `AED ${finalShipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Tax (VAT 5%)</span>
          <span>AED {finalTax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-3 flex justify-between">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
          <span className="text-lg font-semibold text-pink-600 dark:text-pink-400">
            AED {finalTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}






