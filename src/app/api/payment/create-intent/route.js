import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware/auth';
import { logRequest, logResponse } from '@/lib/apiLogger';

// POST - Create Stripe payment intent
export async function POST(request) {
  try {
    const user = await requireAuth(request);

    const body = await request.json();
    logRequest('/api/payment/create-intent', 'POST', { url: request.url, user: { id: user.id }, body });
    const { amount, currency = 'aed' } = body;

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Valid amount is required' },
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      // Return mock payment intent for development
      const mockResponse = {
        success: true,
        data: {
          clientSecret: 'mock_payment_intent_secret_' + Date.now(),
          paymentIntentId: 'pi_mock_' + Date.now(),
        },
        message: 'Using mock payment (Stripe not configured)',
      };
      logResponse('/api/payment/create-intent', 'POST', { status: 200, result: { paymentIntentId: mockResponse.data.paymentIntentId } });
      return NextResponse.json(mockResponse);
    }

    // Import Stripe dynamically
    const stripe = (await import('stripe')).default(stripeSecretKey);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        userId: user.id,
      },
    });

    const responsePayload = {
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    };
    logResponse('/api/payment/create-intent', 'POST', { status: 200, result: { paymentIntentId: paymentIntent.id } });
    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('Create payment intent error:', error);
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to create payment intent', error: error.message },
      { status: 500 }
    );
  }
}
