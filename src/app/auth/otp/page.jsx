import OTP from '@/components/auth/OTP';
import React from 'react';

export const metadata = {
  title: "Flowora Shop - Verify OTP",
  description:
    "Verify your email to complete registration at Flowora Shop. Fresh flowers, cakes, gifts, and party decorations with delivery across Dubai & UAE.",
  keywords: [
    "OTP verification",
    "Flowora Shop",
    "flower delivery",
    "Dubai",
    "UAE",
    "email verification",
    "gifts",
    "cakes",
  ],
  openGraph: {
    title: "Flowora Shop - Verify OTP",
    description:
      "Complete your registration by verifying your email at Flowora Shop.",
    type: "website",
  },
};
export const dynamic = 'force-dynamic';

const page = () => {
  return <OTP />;
};

export default page;
