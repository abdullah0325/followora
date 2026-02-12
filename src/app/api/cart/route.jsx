import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    const user = await requireAuth(request);

    const items = await prisma.cartItem.findMany({
      where: { user_id: user.id },
      include: {
        product: true,
      },
    });

    const cart = items.map((ci) => ({
      id: ci.id,
      product: {
        id: ci.product.id,
        name: ci.product.name,
        price: ci.product.price,
        slug: ci.product.slug,
        image: ci.product.image,
      },
      quantity: ci.quantity,
    }));

    return NextResponse.json({ success: true, data: { items: cart } });
  } catch (err) {
    console.error('Cart GET error:', err);
    if (err && err.message === 'Unauthorized') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
