import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { deleteMultipleImages, getPublicIdFromUrl } from "@/components/cloudinary/ImageUploader";
import { verifyAdmin } from "@/lib/auth";
import { generateSlug } from "@/lib/generateSlug";

/**
 * POST /api/products/bulk
 * Body: { products: [ { name, price, category, slug, ... }, ... ] }
 */

export async function POST(request) {
  try {
    const { error } = verifyAdmin(request);
    if (error) return error;

    const body = await request.json();
    const products = Array.isArray(body.products) ? body.products : [];

    if (!products.length) {
      return NextResponse.json(
        { success: false, message: "No products provided" },
        { status: 400 }
      );
    }

    console.log("Processing bulk products");

    const createdProducts = [];

    for (const p of products) {
      const { name, price, image, category_id } = p;

      if (!name || price === undefined) {
        return NextResponse.json(
          { success: false, message: "Each product must include name and price" },
          { status: 400 }
        );
      }

      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum < 0) {
        return NextResponse.json(
          { success: false, message: "Invalid price in one of the products" },
          { status: 400 }
        );
      }

      // generate slug
      let slugGenerated = generateSlug(name);

      // check for duplicates in DB and append number if exists
      let slugCandidate = slugGenerated;
      let counter = 1;
      while (
        await prisma.product.findFirst({
          where: { slug: slugCandidate },
        })
      ) {
        slugCandidate = `${slugGenerated}-${counter}`;
        counter++;
      }
      slugGenerated = slugCandidate;

      const newProduct = await prisma.product.create({
        data: {
          name: name.trim(),
          price: priceNum,
          premium: Boolean(p.premium),
          image: image || null,
          images: Array.isArray(p.images) ? p.images : [],
          slug: slugGenerated,
          category_id: category_id || null,
          description: p.description || null,
          stock: p.stock || 0,
        },
      });

      createdProducts.push({
        id: newProduct.id,
        ...newProduct,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Products added successfully",
        data: createdProducts,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Bulk add error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add products", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/bulk?ids=id1,id2
 * OR body: { ids: [] }
 */
export async function DELETE(request) {
  try {
    const { error } = verifyAdmin(request);
    if (error) return error;

    const url = new URL(request.url);
    let ids = [];

    const idsQuery = url.searchParams.get("ids");
    if (idsQuery) {
      ids = idsQuery.split(",").map((id) => id.trim()).filter(Boolean);
    } else {
      const body = await request.json();
      ids = Array.isArray(body.ids) ? body.ids : [];
    }

    if (!ids.length) {
      return NextResponse.json(
        { success: false, message: "No IDs provided for deletion" },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (!products.length) {
      return NextResponse.json(
        { success: false, message: "No products found for given IDs" },
        { status: 404 }
      );
    }

    // collect all images
    const allImages = [];
    products.forEach((p) => {
      if (p.image) allImages.push(p.image);
      if (Array.isArray(p.images)) allImages.push(...p.images);
    });

    const publicIds = allImages
      .map((url) => getPublicIdFromUrl(url))
      .filter(Boolean);

    if (publicIds.length) {
      try {
        await deleteMultipleImages(publicIds);
      } catch (err) {
        console.warn("Cloudinary delete warning:", err.message);
      }
    }

    const result = await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json(
      { success: true, deletedCount: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bulk delete error:", error);
    return NextResponse.json(
      { success: false, message: "Bulk delete failed" },
      { status: 500 }
    );
  }
}

