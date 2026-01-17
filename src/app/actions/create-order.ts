'use server';

import { db } from '@/lib/prisma';
import { removeCpfPunctuation } from '@/lib/validate-cpf';

import { ConsumptionMethod } from '@prisma/generated/enums';
import { redirect } from 'next/navigation';

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}
export async function createOrder(input: CreateOrderInput) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error('Restaurante não encontrado');
  }
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));
  await db.order.create({
    data: {
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      status: 'PENDING',
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0),
    },
  });
  redirect(`/${input.slug}/orders`);
}
