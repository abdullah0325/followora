import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { otpEmailTemplate } from '@/lib/emailTemplate';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log('[ResendOTP] Request for email:', email);

    // 🔎 Validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // 👤 Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // ✅ Already verified - no need to resend
    if (user.is_verified) {
      return NextResponse.json(
        { success: false, message: 'Email is already verified' },
        { status: 400 }
      );
    }

    // 🔢 Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Update user with new OTP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otp_hash: otpHash,
        otp_expiry: otpExpiry,
      },
    });

    console.log('[ResendOTP] New OTP generated for:', email);

    // 📧 Send OTP Email (non-blocking)
    sendEmail({
      to: user.email,
      subject: 'Verify your email (OTP)',
      html: otpEmailTemplate({
        name: user.name,
        otp,
      }),
    }).catch((err) => {
      console.error('[ResendOTP] Email failed:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'OTP resent successfully. Check your email.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ResendOTP] Error:', error);

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
