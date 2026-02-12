import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, otp } = body;
    console.log("email", email, otp);
  
    // 🔎 Validation
    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // 👤 Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    console.log("user", user);
 
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Already verified
    if (user.is_verified) {
      return NextResponse.json(
        { success: false, message: 'Email already verified' },
        { status: 400 }
      );
    }

    // ⏰ OTP expiry check (with 5 second grace period for network delays)
    if (!user.otp_expiry || !user.otp_hash) {
      console.log('[VerifyOTP] No OTP found for user');
      return NextResponse.json(
        { success: false, message: 'OTP expired' },
        { status: 400 }
      );
    }

    const currentTime = new Date();
    const expiryTime = new Date(user.otp_expiry); // Ensure it's a Date
    const expiryWithGrace = new Date(expiryTime.getTime() + 5000); // 5 second grace
    
    if (currentTime > expiryWithGrace) {
      console.log('[VerifyOTP] OTP expired. Current:', currentTime, 'Expiry:', expiryTime);
      return NextResponse.json(
        { success: false, message: 'OTP expired' },
        { status: 400 }
      );
    }

    // 🔐 Compare OTP
    const isOtpValid = await bcrypt.compare(otp, user.otp_hash);

    if (!isOtpValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // ✅ Mark verified & clear OTP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        is_verified: true,
        otp_hash: null,
        otp_expiry: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Email verified successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify OTP error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error:
          process.env.NODE_ENV === 'development'
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}
