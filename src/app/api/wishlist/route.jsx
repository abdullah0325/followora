import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    const user = await requireAuth(request);

    const items = await prisma.wishlistItem.findMany({
      where: { user_id: user.id },
      include: {
        product: true,
      },
    });

    const products = items.map((it) => ({
      id: it.product.id,
      name: it.product.name,
      price: it.product.price,
      slug: it.product.slug,
      image: it.product.image,
    }));

    return NextResponse.json({ success: true, data: { items: products } });
  } catch (err) {
    console.error('Wishlist GET error:', err);
    if (err && err.message === 'Unauthorized') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = await requireAuth(request);

    const url = new URL(request.url);
    const wishlistItemId = url.searchParams.get('wishlistItemId');
    const productId = url.searchParams.get('productId');

    if (!wishlistItemId && !productId) {
      return NextResponse.json({ success: false, message: 'wishlistItemId or productId is required' }, { status: 400 });
    }

    let deleted = null;
    if (wishlistItemId) {
      deleted = await prisma.wishlistItem.delete({
        where: {
          id: wishlistItemId,
          user_id: user.id,
        },
      });
    } else {
      deleted = await prisma.wishlistItem.delete({
        where: {
          user_id_product_id: {
            user_id: user.id,
            product_id: productId,
          },
        },
      });
    }

    return NextResponse.json({ success: true, message: 'Item removed from wishlist', data: { wishlistItemId: deleted.id, productId: deleted.product_id } });
  } catch (err) {
    console.error('Wishlist DELETE error:', err);
    if (err && err.message === 'Unauthorized') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    let user;
    try {
      user = await requireAuth(request);
    } catch (err) {
      user = null;
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    if (user) {
      const existingItem = await prisma.wishlistItem.findUnique({
        where: {
          user_id_product_id: {
            user_id: user.id,
            product_id: productId,
          },
        },
      });
      
      if (existingItem) {
        await prisma.wishlistItem.delete({
          where: { id: existingItem.id },
        });
        return NextResponse.json({
          success: true,
          message: 'Item removed from wishlist',
          data: { productId },
        });
      } else {
        await prisma.wishlistItem.create({
          data: {
            user_id: user.id,
            product_id: productId,
          },
        });
        return NextResponse.json({
          success: true,
          message: 'Item added to wishlist',
          data: { productId },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'User not logged in: handle wishlist in localStorage',
      data: { productId },
    });
  } catch (err) {
    console.error('Wishlist error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined },
      { status: 500 }
    );
  }
}
