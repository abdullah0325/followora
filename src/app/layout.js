import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Followora - Fresh Flowers & Gifts Delivery in Dubai & UAE",
  description: "Best online flower shop in Dubai & UAE. Same-day delivery, midnight delivery available. Fresh flowers, cakes, gifts, and party decorations.",
  keywords: ["flowers", "flower delivery", "Dubai", "UAE", "same day delivery", "midnight delivery", "gifts", "cakes"],
  openGraph: {
    title: "Followora - Fresh Flowers & Gifts Delivery",
    description: "Best online flower shop in Dubai & UAE",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
