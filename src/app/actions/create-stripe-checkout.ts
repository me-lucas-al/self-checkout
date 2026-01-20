'use server'

import Stripe from 'stripe';

export async function createStripeCheckout() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-12-15.clover',
    });
}