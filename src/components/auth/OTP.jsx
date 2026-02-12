'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiLoader, FiRefreshCw } from 'react-icons/fi';
import { callPublicApi } from '@/services/callApis';
import { LoginHeading } from '../ui/LoginHeading';

export default function OTP() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // For resend OTP
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedEmail = localStorage.getItem('otp_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    // We defer the redirection logic to after mount to avoid issues during initial render
    // However, if we return null when not mounted, this useEffect running on client is fine.
  }, []);

  useEffect(() => {
    if (mounted) {
      const storedEmail = localStorage.getItem('otp_email');
      if (!storedEmail) {
        router.push('/auth/register');
      }
    }
  }, [mounted, router]);

  if (!mounted) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const res = await callPublicApi('/auth/verify-otp', 'POST', {
        email,
        otp,
      });
      console.log("res", res);

      localStorage.removeItem('otp_email');
      router.push('/auth/login');
    } catch (err) {
      setError(err?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // New function: resend OTP
  const handleResendOtp = async () => {
    if (resendLoading) return;

    setResendMessage('');
    setResendLoading(true);

    try {
      const res = await callPublicApi('/auth/resend-otp', 'POST', {
        email,
      });
      console.log("res", res);

      setResendMessage(res.message || 'OTP resent successfully.');
    } catch (err) {
      setResendMessage(err?.message || 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-8 sm:py-10 bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-zinc-900 dark:via-black dark:to-zinc-900">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-white/20 shadow-[0_10px_40px_rgba(236,72,153,0.15)] sm:shadow-[0_20px_80px_rgba(236,72,153,0.25)] animate-fadeIn">
        <div className="p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10">
          <LoginHeading text="Verify OTP" />
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
            Enter the OTP sent to <span className="font-semibold break-all">{email}</span>
          </p>

          {error && (
            <div className="mb-4 sm:mb-5 md:mb-6 p-2 sm:p-3 md:p-4 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/30 animate-shake text-xs sm:text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* OTP INPUT */}
            <div className="relative group">
              <FiLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition text-base sm:text-lg" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl md:rounded-xl bg-white/70 dark:bg-zinc-800/70 text-xs sm:text-sm md:text-base text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-pink-500 outline-none transition text-center tracking-widest"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl md:rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/40 flex items-center justify-center disabled:opacity-60 text-xs sm:text-sm md:text-base gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin text-base sm:text-lg" />
                  <span>Verifying...</span>
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>

          {/* RESEND OTP BUTTON */}
          <div className="mt-4 sm:mt-5 md:mt-6 text-center">
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-pink-600 hover:text-pink-700 font-semibold transition text-xs sm:text-sm md:text-base"
            >
              {resendLoading ? (
                <>
                  <FiLoader className="animate-spin text-base" />
                  <span>Resending...</span>
                </>
              ) : (
                <>
                  <FiRefreshCw className="text-base" />
                  <span>Resend OTP</span>
                </>
              )}
            </button>

            {resendMessage && (
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                {resendMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
