import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { generateToken } from '@/lib/middleware/auth';
import { sendEmail } from '@/lib/email';
import { otpEmailTemplate } from '@/lib/emailTemplate';
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, role = 'user' } = body;

    console.log('Signup body:', email, name, role, password);

    // 🔎 Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // 🔁 Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // 🔐 Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 🔢 Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        role,
        is_verified: false,
        otp_hash: otpHash,
        otp_expiry: otpExpiry,
      },
    });

    // 📧 Send OTP Email (non-blocking)
    sendEmail({
      to: user.email,
      subject: 'Verify your email (OTP)',
      html: otpEmailTemplate({
        name: user.name,
        otp,
      }),
    }).catch((err) => {
      console.error('OTP email failed:', err);
    });

    // 🔑 Generate JWT
    const token = generateToken(
      user.id,
      user.email,
      user.role
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Signup successful. OTP sent to your email.',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.is_verified,
          },
          token,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);

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
