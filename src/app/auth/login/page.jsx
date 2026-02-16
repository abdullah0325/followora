import Login from '@/components/auth/Login';
import React from 'react';

export const metadata = {
  title: "Flowora Shop - Login",
  description:
    "Login to Flowora Shop to order fresh flowers, cakes, gifts, and party decorations with fast delivery across Dubai & UAE.",
  keywords: [
    "Flowora Shop login",
    "flower delivery Dubai",
    "UAE flower shop",
    "login",
    "gifts",
    "cakes",
    "midnight delivery",
  ],
  openGraph: {
    title: "Flowora Shop - Login",
    description:
      "Login to your Flowora Shop account and enjoy fresh flowers and gifts delivery across Dubai & UAE.",
    type: "website",
  },
};
export const dynamic = 'force-dynamic';

const page = () => {
  return <Login />;
};

export default page;

