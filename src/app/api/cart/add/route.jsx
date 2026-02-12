import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

export async function POST(request) {
  try {
    let user;
    try {
      user = await requireAuth(request);
    } catch (err) {
      user = null;
    }

    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
    }

    // Check product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    // If user is logged in, save to DB
    if (user) {
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          user_id_product_id: {
            user_id: user.id,
            product_id: productId,
          },
        },
      });
      
      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            user_id: user.id,
            product_id: productId,
            quantity,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      data: { productId, quantity },
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined },
      { status: 500 }
    );
  }
}
