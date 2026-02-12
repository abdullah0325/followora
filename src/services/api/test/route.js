import { prisma } from "@/lib/prisma";

export async function GET() {
  const result = await prisma.$queryRaw`SELECT 1`;
  return Response.json({ success: true });
}
