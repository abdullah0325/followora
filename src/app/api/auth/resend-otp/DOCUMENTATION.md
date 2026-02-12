/**
 * Resend OTP API Endpoint Test Documentation
 * 
 * Endpoint: POST /api/auth/resend-otp
 * 
 * Purpose:
 * - Resend OTP to user's email when they haven't received it or it expired
 * - Generates a new OTP with fresh 10-minute expiry
 * - Only works for unverified users
 */

// ============================================
// USAGE EXAMPLES
// ============================================

// Example 1: Frontend Component Usage
// ========================================
/*
import { callPublicApi } from '@/services/callApis';

const handleResendOtp = async () => {
  try {
    const res = await callPublicApi('/auth/resend-otp', 'POST', {
      email: 'user@example.com'
    });
    
    if (res.success) {
      console.log('✅ OTP resent:', res.message);
    } else {
      console.error('❌ Failed:', res.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};
*/

// ============================================
// REQUEST PAYLOAD
// ============================================

/*
POST /api/auth/resend-otp
Content-Type: application/json

{
  "email": "user@example.com"
}
*/

// ============================================
// SUCCESS RESPONSE (200)
// ============================================

/*
{
  "success": true,
  "message": "OTP resent successfully. Check your email."
}
*/

// ============================================
// ERROR RESPONSES
// ============================================

// 1. Missing email (400)
/*
{
  "success": false,
  "message": "Email is required"
}
*/

// 2. User not found (404)
/*
{
  "success": false,
  "message": "User not found"
}
*/

// 3. Email already verified (400)
/*
{
  "success": false,
  "message": "Email is already verified"
}
*/

// 4. Server error (500)
/*
{
  "success": false,
  "message": "Internal server error",
  "error": "... error details in development ..."
}
*/

// ============================================
// WHAT IT DOES
// ============================================

/*
1. Validates email is provided
2. Finds user in database
3. Checks if email is already verified
4. Generates new 6-digit OTP
5. Hashes OTP with bcrypt
6. Sets OTP expiry to 10 minutes
7. Saves to database
8. Sends email with new OTP
9. Returns success message
*/

// ============================================
// FLOW DIAGRAM
// ============================================

/*
User clicks "Resend OTP"
        ↓
POST /api/auth/resend-otp
        ↓
Validate email exists
        ↓
Find user in database
        ↓
Check if already verified?
        ├─ YES → Return error "Already verified"
        └─ NO → Continue
        ↓
Generate new OTP (6 digits)
        ↓
Hash OTP with bcrypt
        ↓
Set expiry: now + 10 minutes
        ↓
Save to database
        ↓
Send email with new OTP
        ↓
Return success message
        ↓
Frontend shows: "OTP resent successfully"
*/

// ============================================
// TESTING WITH CURL
// ============================================

/*
curl -X POST http://localhost:3000/api/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
*/

// ============================================
// IMPORTANT NOTES
// ============================================

/*
✅ Uses existing email sending infrastructure
✅ OTP expires after 10 minutes (same as initial signup)
✅ New OTP overwrites old one
✅ Only unverified users can resend
✅ Logs all operations for debugging
✅ Non-blocking email sending (doesn't wait)
✅ Safe error messages (no user enumeration)
*/
