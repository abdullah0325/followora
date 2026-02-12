import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/middleware/auth';

export async function DELETE(request) {
  try {
    const user = await requireAuth(request);
   
    const result = await prisma.cartItem.deleteMany({
      where: { user_id: user.id },
    });
    
    return NextResponse.json({
      success: true,
      message: `${result.count} item(s) cleared from cart`,
    });
  } catch (err) {
    console.error('Clear Cart Error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to clear cart', error: process.env.NODE_ENV === 'development' ? err.message : undefined },
      { status: 500 }
    );
  }
}
