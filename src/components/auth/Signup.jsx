'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiMail,
  FiLock,
  FiUser,
  FiLoader,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import Link from 'next/link';

import { useAuth } from '@/hooks/authContext';
import { LoginHeading } from '../ui/LoginHeading';

export default function Signup() {
  const router = useRouter();
  const { signup, loading } = useAuth();

  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // ✅ frontend validations
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    const success = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      localStorage.setItem('otp_email', formData.email);
      router.push('/auth/otp');
    } else {
      setError('Signup failed. Email may already exist.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-8 bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-zinc-900 dark:via-black dark:to-zinc-900">

      <div className="w-full max-w-md rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border shadow-xl">

        <div className="p-6 sm:p-8 md:p-10">

          <LoginHeading text="Create Account" />

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Sign up to get started
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 text-sm animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* FIRST NAME */}
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password (min 6 chars)"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-11 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-11 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold flex justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-pink-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
