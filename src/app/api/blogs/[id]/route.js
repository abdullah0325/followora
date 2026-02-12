import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { deleteImage, getPublicIdFromUrl, uploadImage } from "@/components/cloudinary/ImageUploader";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const blog = await prisma.blog.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
    });
    
    if (!blog) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }
  
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { error } = await verifyAdmin(req);
    if (error) return error;
    
    const { id } = await params;

    const formData = await req.formData();

    const blog = await prisma.blog.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
    });
    
    if (!blog) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    const updateData = {};
    const title = formData.get("title");
    const slug = formData.get("slug");
    const content = formData.get("content");
    const tags = formData.get("tags");
    const status = formData.get("status");

    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (content) updateData.content = content;
    if (status) updateData.status = status;
    if (tags) {
      updateData.tags = tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const imageFile = formData.get("image");

    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      if (blog.image) {
        const publicId = getPublicIdFromUrl(blog.image);
        if (publicId) {
          await deleteImage(publicId);
        }
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadRes = await uploadImage(
        `data:${imageFile.type};base64,${buffer.toString("base64")}`,
        "blogs"
      );

      updateData.image = uploadRes.url;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blog.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { error } = await verifyAdmin(req);
    if (error) return error;
    
    const { id } = await params;

    const blog = await prisma.blog.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
    });
    
    if (!blog) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    if (blog.image) {
      const publicId = getPublicIdFromUrl(blog.image);
      await deleteImage(publicId);
    }

    await prisma.blog.delete({
      where: { id: blog.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}
