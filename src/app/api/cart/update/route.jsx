import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

export async function POST(request) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();
    const { cartItemId, action } = body;

    if (!cartItemId || !['increase', 'decrease', 'delete'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'cartItemId and valid action are required' },
        { status: 400 }
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        user_id: user.id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ success: false, message: 'Cart item not found' }, { status: 404 });
    }

    if (action === 'increase') {
      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: cartItem.quantity + 1 },
      });
      return NextResponse.json({
        success: true,
        message: 'Cart item increased successfully',
        data: { cartItemId, quantity: cartItem.quantity + 1 },
      });
    } else if (action === 'decrease') {
      if (cartItem.quantity > 1) {
        await prisma.cartItem.update({
          where: { id: cartItemId },
          data: { quantity: cartItem.quantity - 1 },
        });
        return NextResponse.json({
          success: true,
          message: 'Cart item decreased successfully',
          data: { cartItemId, quantity: cartItem.quantity - 1 },
        });
      } else {
        return NextResponse.json({ success: false, message: 'Quantity cannot be less than 1' }, { status: 400 });
      }
    } else if (action === 'delete') {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return NextResponse.json({
        success: true,
        message: 'Cart item deleted successfully',
        data: { cartItemId, quantity: 0 },
      });
    }
  } catch (err) {
    console.error('Cart update error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined },
      { status: 500 }
    );
  }
}
