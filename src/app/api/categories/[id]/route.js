import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/generateSlug";
import { verifyAdmin } from "@/lib/auth";

/* =========================
   PUT /api/categories/:id
   Update category by ID
========================= */
export async function PUT(request, { params }) {
  try {
    const { error } = verifyAdmin(request);
    if (error) return error;

    const { id } = await params;
    console.log("id", id);

    const { name, slug, is_active } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Category ID required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // Handle slug auto-generation and uniqueness
    let newSlug = category.slug;
    if (name || slug) {
      newSlug = slug || generateSlug(name);

      if (newSlug !== category.slug) {
        const slugExists = await prisma.category.findFirst({
          where: {
            slug: newSlug,
            NOT: { id },
          },
        });

        if (slugExists) {
          return NextResponse.json(
            { success: false, message: "Slug already exists" },
            { status: 409 }
          );
        }
      }
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: name ? name.trim() : category.name,
        slug: newSlug,
        is_active: is_active !== undefined ? is_active : category.is_active,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      data: {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        is_active: updated.is_active,
        created_at: updated.created_at,
        updated_at: updated.updated_at,
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
   DELETE /api/categories/:id
   Delete category by ID
========================= */
export async function DELETE(request, { params }) {
  try {
    const { error } = verifyAdmin(request);
    if (error) return error;

    const { id } = await params;
    console.log("id", id);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Category ID required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

