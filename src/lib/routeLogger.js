/**
 * Route Logger Utility
 * Logs navigation attempts with user role information
 */

export function logRouteAttempt(pathname, userRole = null) {
  if (typeof window === 'undefined') return; // Server-side, skip client logging
  
  const isAdminRoute = pathname.startsWith('/admin');
  const isUserRoute = pathname.startsWith('/order') || pathname.startsWith('/checkout');
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`📍 [CLIENT NAVIGATION] Route Attempt: ${pathname}`);
  console.log(`🎯 Route Type: ${isAdminRoute ? '🔴 ADMIN' : isUserRoute ? '🟡 USER' : '🟢 PUBLIC'}`);
  
  if (userRole) {
    console.log(`👤 User Role: ${userRole.toUpperCase()}`);
    
    if (isAdminRoute && userRole !== 'admin') {
      console.log(`❌ [BLOCKED] This is an ADMIN route but user is ${userRole.toUpperCase()}`);
      console.log(`⚠️  Middleware will redirect to home page`);
    } else if (isAdminRoute && userRole === 'admin') {
      console.log(`✅ [ALLOWED] User is ADMIN - access permitted`);
    }
  }
  
  console.log('═══════════════════════════════════════════════════════════\n');
}

export function logAdminAccess(userRole) {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🔐 [ADMIN ACCESS CHECK]');
  console.log(`👤 Current User Role: ${userRole?.toUpperCase() || 'UNKNOWN'}`);
  console.log(`✅ Access: ${userRole === 'admin' ? '✓ GRANTED' : '✗ DENIED'}`);
  console.log('═══════════════════════════════════════════════════════════\n');
}
