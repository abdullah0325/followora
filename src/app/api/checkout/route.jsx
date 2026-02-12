import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/middleware/auth";

export async function POST(request) {
  try {
    const user = await requireAuth(request);

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { success: false, message: "Stripe not configured" },
        { status: 500 }
      );
    }

    const stripe = (await import("stripe")).default(stripeSecretKey);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const body = await request.json();
    const { billing, shipping, contactNumber } = body;

    if (!billing || !shipping || !contactNumber) {
      return NextResponse.json(
        { success: false, message: "Missing checkout data" },
        { status: 400 }
      );
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { user_id: user.id },
      include: {
        product: true,
      },
    });

    if (!cartItems.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    let subtotal = 0;

    const line_items = cartItems.map((item) => {
      const product = item.product;
      const price = Number(product.price);
      const quantity = Number(item.quantity);
      subtotal += price * quantity;

      return {
        price_data: {
          currency: "aed",
          product_data: {
            name: product.name,
            images: [
              product.image?.startsWith("http")
                ? product.image
                : `${baseUrl}${product.image || "/images/fallback.jpg"}`,
            ],
          },
          unit_amount: Math.round(price * 100),
        },
        quantity,
      };
    });

    const shippingCost = subtotal > 100 ? 0 : 20;
    const taxCost = subtotal * 0.05;

    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: "aed",
          product_data: { name: "Shipping Cost" },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    if (taxCost > 0) {
      line_items.push({
        price_data: {
          currency: "aed",
          product_data: { name: "VAT (5%)" },
          unit_amount: Math.round(taxCost * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["AE"],
      },
      metadata: {
        userId: user.id,
        email: user.email,
        contactNumber,
        billing: JSON.stringify(billing),
        shipping: JSON.stringify(shipping),
        subtotal: subtotal.toFixed(2),
        tax: taxCost.toFixed(2),
        shippingCost: shippingCost.toFixed(2),
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Checkout failed",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
