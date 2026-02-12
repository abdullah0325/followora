import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, otp, newPassword } = body;

    // Validation
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }

    // Check password length
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if OTP exists and is valid
    if (!user.otp_expiry || !user.otp_hash) {
      return NextResponse.json(
        { success: false, message: 'OTP expired or not requested' },
        { status: 400 }
      );
    }

    // OTP expiry check
    const currentTime = new Date();
    const expiryTime = new Date(user.otp_expiry);

    if (currentTime > expiryTime) {
      return NextResponse.json(
        { success: false, message: 'OTP expired' },
        { status: 400 }
      );
    }

    // Compare OTP
    const isOtpValid = await bcrypt.compare(otp, user.otp_hash);

    if (!isOtpValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password_hash: passwordHash,
        otp_hash: null,
        otp_expiry: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Password changed successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Change password error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to change password',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
