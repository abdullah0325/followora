import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";
import { deleteImage, extractPublicId } from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { error } = verifyAdmin(req);
    if (error) return error;

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "IDs required" }, { status: 400 });
    }

    const blogs = await prisma.blog.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    for (const blog of blogs) {
      if (blog.image_url) {
        const publicId = extractPublicId(blog.image_url);
        await deleteImage(publicId);
      }
    }

    await prisma.blog.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bulk blog delete error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

