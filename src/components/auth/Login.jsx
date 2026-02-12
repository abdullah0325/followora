'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiMail,
  FiLock,
  FiLoader,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import Link from 'next/link';

import { LoginHeading } from '../ui/LoginHeading';
import { useAuth } from '@/hooks/authContext';

export default function Login() {
  const router = useRouter();
  const { login, loading, error, clearError } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login({ email: formData.email, password: formData.password });
    console.log("sucess", success);

    // Get user from context after login
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    if (success) {
      if (user && (user.role === 'admin' || user.role === 'manager')) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-8 bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-black dark:to-zinc-900">

      <div className="w-full max-w-md rounded-2xl overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border shadow-xl">

        <div className="p-6 sm:p-8 md:p-10">

          {/* HEADER */}
          <LoginHeading text="Welcome Back" />

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Login to continue your journey
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 text-sm animate-shake">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Email
              </label>
              <div className="relative group">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 dark:bg-zinc-800/70 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Password
              </label>

              <div className="relative group">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/70 dark:bg-zinc-800/70 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-pink-500 outline-none"
                />

                {/* 👁️ SHOW / HIDE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white font-semibold transition shadow-lg hover:shadow-pink-500/40 flex justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

          </form>

          {/* REGISTER */}
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
            Don’t have an account?{' '}
            <Link
              href="/auth/register"
              className="text-pink-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
