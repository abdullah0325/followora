import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export function getToken(req) {
  return (
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.split(" ")[1]
  );
}

// ✅ normal user verify
export async function verifyUser(req) {
  const token = getToken(req);

  if (!token) {
    return {
      error: NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, is_active: true },
    });

    if (!user || !user.is_active) {
      return {
        error: NextResponse.json(
          { message: "Invalid token" },
          { status: 401 }
        ),
      };
    }
    
    return { user: { ...decoded, ...user } };
  } catch {
    return {
      error: NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      ),
    };
  }
}

// ✅ admin verify
export async function verifyAdmin(req) {
  const token = getToken(req);
 
  if (!token) {
    return {
      error: NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user exists and is admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, is_active: true },
    });

    if (!user || !user.is_active) {
      return {
        error: NextResponse.json(
          { message: "Invalid token" },
          { status: 401 }
        ),
      };
    }
    
    if (user.role !== "admin") {
      return {
        error: NextResponse.json(
          { message: "Admin access only" },
          { status: 403 }
        ),
      };
    }

    return { admin: { ...decoded, ...user } };
  } catch {
    return {
      error: NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      ),
    };
  }
}
