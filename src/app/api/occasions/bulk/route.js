import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req) {
  try {
    const { error } = verifyAdmin(req);
    if (error) return error;

    const body = await req.json();
    const occasions = Array.isArray(body.occasions) ? body.occasions : [];

    if (occasions.length === 0) {
      return NextResponse.json(
        { message: "No occasions provided" },
        { status: 400 }
      );
    }

    const docs = occasions.map((o) => {
      if (!o.name || !o.slug) {
        throw new Error("Each occasion must have name and slug");
      }

      return {
        name: o.name.trim(),
        slug: o.slug.trim(),
        images: o.images || "",
        is_active: o.is_active ?? true,
      };
    });

    const created = await prisma.occasion.createMany({
      data: docs,
      skipDuplicates: true,
    });

    // Fetch created occasions
    const occasionList = await prisma.occasion.findMany({
      where: {
        name: {
          in: docs.map((d) => d.name),
        },
      },
      orderBy: { created_at: "desc" },
      take: docs.length,
    });

    return NextResponse.json(
      {
        success: true,
        count: created.count,
        occasions: occasionList,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Bulk occasion add error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to add occasions",
      },
      { status: 500 }
    );
  }
}
