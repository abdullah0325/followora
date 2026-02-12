import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  // 🔓 public GET allowed
  if (method === "GET") {
    return NextResponse.next();
  }

  // 🔒 admin protection
  const adminRoutes =
    pathname.startsWith("/api/products") ||
    pathname.startsWith("/api/categories") ||
    pathname.startsWith("/api/occasions") ||
    pathname.startsWith("/api/blogs") ||
    pathname.startsWith("/api/orders") ||
    pathname.startsWith("/admin");

  if (adminRoutes) {
    const { error } = await verifyAdmin(req);
    if (error) return error;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
};
