import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/generateSlug";
import { verifyAdmin } from "@/lib/auth";

/* =========================
   GET /api/categories
   Pagination + Search + Status
========================= */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const is_active = searchParams.get("is_active");
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 12)));
    const skip = (page - 1) * limit;

    const where = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (is_active !== null) where.is_active = is_active === "true";

    const total = await prisma.category.count({ where });
    const categories = await prisma.category.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        categories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          is_active: c.is_active,
          created_at: c.created_at,
          updated_at: c.updated_at,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* =========================
   POST /api/categories
   Create category
========================= */
export async function POST(request) {
  try {
    const { error } = await verifyAdmin(request);
    if (error) return error;
    
    const { name, slug, is_active = true } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const finalSlug = slug || generateSlug(name);

    const exists = await prisma.category.findFirst({ where: { slug: finalSlug } });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: finalSlug,
        is_active,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: { id: category.id },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
