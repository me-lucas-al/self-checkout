import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-12-15.clover',
    });
    const signature = req.headers.get('Stripe-Signature')!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;
    const text = await req.text();
    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        webhookSecret
    );
    const paymentIsSuccessful = event.type === 'checkout.session.completed';
    if (paymentIsSuccessful) {
        const orderId = event.data.object.metadata?.orderId;
        if (!orderId) return NextResponse.json({ received: true });
        await db.order.update({
            where: {
                id: Number(orderId),
            },
            data: {
                status: 'PA\ppYMENT_CONFIRMED',
            },
        })
    }
    return NextResponse.json({ received: true });
}