import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/prisma';

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
    <div className="lg:bg-black lg:p-4">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-50 rounded-full"
      >
        <ChevronLeftIcon />
      </Button>
      <div className="relative mx-auto mb-4 h-[250px] w-full overflow-hidden md:h-[300px] lg:h-[350px] lg:w-[600px] lg:border-2 lg:border-white">
        <Image
          src={restaurant?.coverImageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
