import Signup from '@/components/auth/Signup';
import React from 'react';

export const metadata = {
  title: "Flowora Shop - Create Account",
  description:
    "Create an account at Flowora Shop to order fresh flowers, cakes, gifts, and party decorations with same-day and midnight delivery across Dubai & UAE.",
  keywords: [
    "Flowora Shop signup",
    "create account",
    "flower delivery Dubai",
    "UAE flower shop",
    "register",
    "gifts",
    "cakes",
    "same day delivery",
  ],
  openGraph: {
    title: "Flowora Shop - Create Account",
    description:
      "Sign up at Flowora Shop and enjoy fresh flowers, cakes, and gifts delivery across Dubai & UAE.",
    type: "website",
  },
}
export const dynamic = 'force-dynamic';

const page = () => {
  return <Signup />;
};

export default page;
