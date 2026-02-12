import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { uploadImage } from "@/components/cloudinary/ImageUploader";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { error } = await verifyAdmin(req);
    if (error) return error;
    
    const formData = await req.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const content = formData.get("content");
    const author = formData.get("author");
    const seo_title = formData.get("seo_title");
    const seo_description = formData.get("seo_description");
    const file = formData.get("image");

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, message: "title, slug, content are required" },
        { status: 400 }
      );
    }

    const exists = await prisma.blog.findUnique({ where: { slug } });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    let image = "";

    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await uploadImage(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        "blogs"
      );
      image = uploadRes.url;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        image,
        seo_title,
        seo_description,
        author: author || "Aoroma Flowers",
      },
    });

    return NextResponse.json(
      { success: true, blog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
