import Login from '@/components/auth/Login';
import React from 'react';

export const metadata = {
  title: "Aroma Flowers - Login",
  description:
    "Login to Aroma Flowers to order fresh flowers, cakes, gifts, and party decorations with fast delivery across Dubai & UAE.",
  keywords: [
    "Aroma Flowers login",
    "flower delivery Dubai",
    "UAE flower shop",
    "login",
    "gifts",
    "cakes",
    "midnight delivery",
  ],
  openGraph: {
    title: "Aroma Flowers - Login",
    description:
      "Login to your Aroma Flowers account and enjoy fresh flowers and gifts delivery across Dubai & UAE.",
    type: "website",
  },
};
export const dynamic = 'force-dynamic';

const page = () => {
  return <Login />;
};

export default page;

