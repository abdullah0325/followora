import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/generateSlug";
import { uploadImage } from "@/components/cloudinary/ImageUploader";
import { verifyAdmin } from '@/lib/auth';

/* =========================
   CREATE OCCASION
========================= */
export async function POST(request) {
  try {
    const { error } = await verifyAdmin(request);
    if (error) return error;
    
    const formData = await request.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const is_active = formData.get("is_active") !== "false";
    const file = formData.get("image");

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const finalSlug = slug || generateSlug(name);

    // Check slug uniqueness
    const exists = await prisma.occasion.findFirst({ where: { slug: finalSlug } });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    // Image upload
    let image = "";
    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await uploadImage(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        "occasions"
      );
      image = uploadRes.url;
    }

    const occasion = await prisma.occasion.create({
      data: {
        name: name.trim(),
        slug: finalSlug,
        is_active,
        images: image,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Occasion created",
        data: { id: occasion.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
   GET OCCASIONS
========================= */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const isActive = searchParams.get("is_active");
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 12)));
    const skip = (page - 1) * limit;

    const where = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (isActive !== null) where.is_active = isActive === "true";

    const total = await prisma.occasion.count({ where });
    const occasions = await prisma.occasion.findMany({
      where,
      orderBy: { created_at: 'desc' },
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        occasions: occasions.map((o) => ({
          id: o.id,
          name: o.name,
          slug: o.slug,
          is_active: o.is_active,
          image: o.images || "",
          created_at: o.created_at,
          updated_at: o.updated_at,
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
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
