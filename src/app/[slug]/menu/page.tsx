import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/prisma';
import RestaurantHeader from './components/header';

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsuptionMethodValid = (method: string) => {
  return ['DINE_IN', 'TAKE_AWAY'].includes(method.toUpperCase());
};
export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!restaurant || !isConsuptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
}
