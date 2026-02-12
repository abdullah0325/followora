'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/authContext';
import { useCart } from '@/hooks/CartContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { LoginHeading } from '../ui/Heading';
import { callPrivateApi } from '@/services/callApis';

export default function CheckoutPage() {
  const router = useRouter();
  const { token, user, isAuthenticated, loading: authLoading } = useAuth();
  const { cartItems, loading: cartLoading } = useCart();
  console.log("user", user);

  const [billing, setBilling] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'UAE',
  });

  const [shipping, setShipping] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'UAE',
  });

  const [contactNumber, setContactNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if user not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error('Please login to access checkout');
      router.push('/auth/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Pre-fill user info
  useEffect(() => {
    if (user) {
      setContactNumber(user.phone || '');
      setBilling(prev => ({
        ...prev,
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        postalCode: user.address?.postalCode || '',
      }));
      setShipping(prev => ({
        ...prev,
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        postalCode: user.address?.postalCode || '',
      }));
    }
  }, [user]);

  // Debugging API calls
  useEffect(() => {
    async function fetchData() {
      try {
        const publicRes = await fetch('/api/public-data');
        const publicData = await publicRes.json();
        console.log('Public API response:', publicData);

        if (token) {
          const privateRes = await fetch('/api/user-details', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const privateData = await privateRes.json();
          console.log('Private API response:', privateData);
        }
      } catch (err) {
        console.error('API fetch error:', err);
      }
    }
    fetchData();
  }, [token]);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 20;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const total = calculateTotal();

  const handleCheckout = async () => {
    if (
      !billing.street ||
      !billing.city ||
      !billing.state ||
      !billing.postalCode ||
      !shipping.street ||
      !shipping.city ||
      !shipping.state ||
      !shipping.postalCode ||
      !contactNumber
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    // Fix: Define cleanCartItems
    const cleanCartItems = cartItems.map(item => ({
      product: item._id, // Assuming item has _id or product_id
      quantity: item.quantity,
      price: item.price
    }));

    const payload = {
      userEmail: user?.email || "",
      contactNumber: String(contactNumber),

      billing: {
        street: billing.street,
        city: billing.city,
        state: billing.state,
        postalCode: billing.postalCode,
        country: billing.country,
      },

      shipping: {
        street: shipping.street,
        city: shipping.city,
        state: shipping.state,
        postalCode: shipping.postalCode,
        country: shipping.country,
      },

      cartItems: cleanCartItems,
      totalAmount: Number(total.toFixed(2)),
    };


    try {
      const data = await callPrivateApi("/checkout", "POST", payload, token)



      console.log('Checkout API response:', data);

      if (data.success) {
        toast.success('Redirecting to payment...');
        window.location.href = data.url;
      } else {
        toast.error(data.message || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Checkout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (authLoading || cartLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-5">
      <LoginHeading text="Checkout" />

      <div className="bg-white p-5 rounded-lg shadow space-y-4 mt-6">
        {/* User Info */}
        <div className='grid  grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={user?.name}
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        {/* Billing Address */}
        <h3 className="font-semibold mt-4">Billing Address (Dubai)</h3>
        <div className='grid  grid-cols-1 gap-4 md:grid-cols-2'>

          <input
            type="text"
            placeholder="Street"
            value={billing.street}
            onChange={(e) => setBilling({ ...billing, street: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={billing.city}
            onChange={(e) => setBilling({ ...billing, city: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={billing.state}
            onChange={(e) => setBilling({ ...billing, state: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={billing.postalCode}
            onChange={(e) =>
              setBilling({ ...billing, postalCode: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Country"
            value={billing.country}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Shipping Address */}
        <h3 className="font-semibold mt-4">Shipping Address (Dubai)</h3>
        <div className='grid  grid-cols-1 gap-4 md:grid-cols-2'>
          <input
            type="text"
            placeholder="Street"
            value={shipping.street}
            onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={shipping.city}
            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="State"
            value={shipping.state}
            onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={shipping.postalCode}
            onChange={(e) =>
              setShipping({ ...shipping, postalCode: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Country"
            value={shipping.country}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-lg font-semibold transition-all mt-2"
        >
          {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
