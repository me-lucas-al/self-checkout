import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

    switch(event.type) {
        case 'checkout.session.completed': {
        const orderId = event.data.object.metadata?.orderId;
        if (!orderId) return NextResponse.json({ received: true });
        const order = await db.order.update({
            where: {
                id: Number(orderId),
            },
            data: {
                status: 'PAYMENT_CONFIRMED',
            },
            include: {
                restaurant: {
                    select: {
                        slug: true,

                    },
                
                },
            }
        })
        revalidatePath(`/${order.restaurant.slug}/menu`);
        revalidatePath(`/${order.restaurant.slug}/orders?consumptionMethod=${order.consumptionMethod}&cpf=${order.customerCpf}`);
        break;
    }
        case 'charge.failed': {
        const orderId = event.data.object.metadata?.orderId;
        if (!orderId) return NextResponse.json({ received: true });
        const order = await db.order.update({
            where: {
                id: Number(orderId),
            },
            data: {
                status: 'PAYMENT_FAILED',
            },
            include: {
                restaurant: {
                    select: {
                        slug: true,
                    },
                },
            }
        })
        revalidatePath(`/${order.restaurant.slug}/menu`);
        revalidatePath(`/${order.restaurant.slug}/orders?consumptionMethod=${order.consumptionMethod}&cpf=${order.customerCpf}`);
        break;
    }
    }

    return NextResponse.json({ received: true });
}