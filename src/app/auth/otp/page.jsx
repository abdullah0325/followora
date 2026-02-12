import OTP from '@/components/auth/OTP';
import React from 'react';

export const metadata = {
  title: "Aroma Flowers - Verify OTP",
  description:
    "Verify your email to complete registration at Aroma Flowers. Fresh flowers, cakes, gifts, and party decorations with delivery across Dubai & UAE.",
  keywords: [
    "OTP verification",
    "Aroma Flowers",
    "flower delivery",
    "Dubai",
    "UAE",
    "email verification",
    "gifts",
    "cakes",
  ],
  openGraph: {
    title: "Aroma Flowers - Verify OTP",
    description:
      "Complete your registration by verifying your email at Aroma Flowers.",
    type: "website",
  },
};
export const dynamic = 'force-dynamic';

const page = () => {
  return <OTP />;
};

export default page;
