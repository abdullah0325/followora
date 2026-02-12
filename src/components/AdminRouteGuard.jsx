/**
 * Admin Route Guard Component
 * Protects admin routes - requires authentication and admin role
 */

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/authContext';
import { logAdminAccess } from '@/lib/routeLogger';

export default function AdminRouteGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Wait for auth to load
    if (loading) return;

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🛡️  [ADMIN GUARD] Checking authorization');
    console.log(`📍 Current Path: ${pathname}`);
    console.log(`🔐 Authenticated: ${isAuthenticated}`);
    console.log(`👤 User: ${user?.email || 'No user'}`);
    console.log(`🎯 Role: ${user?.role?.toUpperCase() || 'NO ROLE'}`);

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      console.log('\n🚫 [ADMIN GUARD] ACCESS DENIED - Not authenticated');
      console.log(`⚠️  Redirecting to login page...`);
      console.log('═══════════════════════════════════════════════════════════\n');
      router.push('/auth/login');
      return;
    }

    // If not admin, redirect to home
    if (user.role !== 'admin') {
      console.log('\n🚫 [ADMIN GUARD] ACCESS DENIED - Not an admin user!');
      console.log(`⚠️  Redirecting non-admin user to home...`);
      console.log('═══════════════════════════════════════════════════════════\n');
      router.push('/');
      return;
    }

    // User is authenticated and is admin
    console.log('\n✅ [ADMIN GUARD] ACCESS GRANTED - Admin user');
    console.log('═══════════════════════════════════════════════════════════\n');
    logAdminAccess(user.role);
    setIsAuthorized(true);
  }, [pathname, isAuthenticated, user, router, loading]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authorized, don't render children
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
