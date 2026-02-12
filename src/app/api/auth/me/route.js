import { NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    const user = await authenticateRequest(request);
 console.log("user",user);
 
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { user },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}


