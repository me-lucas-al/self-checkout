'use server';

import { headers } from 'next/headers';

import Stripe from 'stripe';

import { db } from '@/lib/prisma';

import { CartProduct } from '../menu/contexts/cart';
import { removeCpfPunctuation } from '@/lib/validate-cpf';

interface CreateStripeCheckoutInput {
  products: CartProduct[];
  orderId: number;
  slug: string;
  consumptionMethod: string;
  cpf: string;
}
export async function createStripeCheckout({
  products,
  orderId,
  slug,
  consumptionMethod,
  cpf
}: CreateStripeCheckoutInput) {
  try {
    const productsWithPrices = await db.product.findMany({
      where: {
        id: {
          in: products.map((product) => product.id),
        },
      },
    });
    const reqHeaders = await headers();
    const origin = reqHeaders.get('origin') || '';
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-12-15.clover',
    });
    const searchParams = new URLSearchParams()
    searchParams.set('consumptionMethod', consumptionMethod);
    searchParams.set('cpf', removeCpfPunctuation(cpf));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      mode: 'payment',
      success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
      cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
      line_items: productsWithPrices.map((product) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: product.price * 100,
        },
        quantity: products.find((p) => p.id === product.id)?.quantity || 1,
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
