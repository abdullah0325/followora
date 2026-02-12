import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';
import { uploadImage, deleteImage, getPublicIdFromUrl } from '@/components/cloudinary/ImageUploader';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id },
        ],
      },
      include: {
        category: true,
        occasions: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error('GET /api/products/[id] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { error } = await verifyAdmin(request);
    if (error) return error;

    const { id } = await params;
    const body = await request.formData();

    const name = body.get('name');
    const price = parseFloat(body.get('price'));
    const description = body.get('description');
    const colour = body.get('colour') || null;
    const size = body.get('size') || null;
    const delivery = body.get('delivery') || null;
    const premium = body.get('premium') === 'true';
    const seo_title = body.get('seo_title') || null;
    const seo_description = body.get('seo_description') || null;
    const gender = body.get('gender') || null;
    const badge = body.get('badge') || null;
    const category = body.get('category') || null;
    const occasionId = body.get('occasions') || null;
    const rating = body.get('rating');

    if (isNaN(price) || price < 0) {
      return NextResponse.json({ success: false, message: 'Price must be valid' }, { status: 400 });
    }

    let categoryId = null;
    if (category) {
      const categoryDoc = await prisma.category.findFirst({
        where: {
          OR: [
            { id: category },
            { slug: category },
          ],
        },
      });
      if (categoryDoc) {
        categoryId = categoryDoc.id;
      }
    }

    let occasionConnect = undefined;
    if (occasionId) {
      occasionConnect = { id: occasionId };
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    const updateData = {
      name: name || undefined,
      price: price || undefined,
      description: description || undefined,
      colour: colour || undefined,
      size: size || undefined,
      delivery: delivery || undefined,
      premium: premium || undefined,
      seo_title: seo_title || undefined,
      seo_description: seo_description || undefined,
      gender: gender || undefined,
      badge: badge || undefined,
      ratings: rating ? parseFloat(rating) : undefined,
    };

    const mainImageFile = body.get('image');
    if (mainImageFile && typeof mainImageFile === 'object' && mainImageFile.size > 0) {
      if (existingProduct.image) {
        const publicId = getPublicIdFromUrl(existingProduct.image);
        if (publicId) {
          await deleteImage(publicId);
        }
      }
      const buffer = Buffer.from(await mainImageFile.arrayBuffer());
      const uploadRes = await uploadImage(`data:${mainImageFile.type};base64,${buffer.toString('base64')}`, 'products');
      updateData.image = uploadRes.url;
    }

    const newImageFiles = body.getAll('images').filter(f => f && typeof f === 'object' && f.size > 0);
    if (newImageFiles.length > 0) {
      if (existingProduct.images && existingProduct.images.length > 0) {
        for (const imgUrl of existingProduct.images) {
          const publicId = getPublicIdFromUrl(imgUrl);
          if (publicId) {
            await deleteImage(publicId);
          }
        }
      }
      const uploadedImages = [];
      for (const file of newImageFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await uploadImage(`data:${file.type};base64,${buffer.toString('base64')}`, 'products');
        if (res?.url) {
          uploadedImages.push(res.url);
        }
      }
      if (uploadedImages.length > 0) {
        updateData.images = uploadedImages;
        if (!updateData.image) {
          updateData.image = uploadedImages[0];
        }
      }
    }

    if (categoryId) {
      updateData.category_id = categoryId;
    }

    if (occasionConnect) {
      updateData.occasions = { set: [], connect: occasionConnect };
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        occasions: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error('PUT /api/products/[id] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await verifyAdmin(request);
    if (error) return error;

    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });

  } catch (error) {
    console.error('DELETE /api/products/[id] Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
