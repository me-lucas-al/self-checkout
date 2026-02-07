'use server';

import { headers } from 'next/headers';

import Stripe from 'stripe';

import { CartProduct } from '../menu/contexts/cart';

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number ;
}
export async function createStripeCheckout({
  products,
  orderId
}: CreateStripeCheckoutInput) {
  try {
    const reqHeaders = await headers();
    const origin = reqHeaders.get('origin') || '';
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-12-15.clover',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      mode: 'payment',
      success_url: origin,
      cancel_url: origin,
      line_items: products.map((product) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      })),
      metadata: {
        orderId: orderId.toString(),
      },
    });
    return { sessionId: session.id, sessionUrl: session.url };
  } catch (error) {
    console.error('Error creating Stripe checkout:', error);
    throw error;
  }
}
