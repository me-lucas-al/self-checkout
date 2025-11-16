import Image from 'next/image';
import { notFound } from 'next/navigation';

import ConsumptionMethodOption from '@/components/restaurant/consumption-method-option';
import { db } from '@/lib/prisma';

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Restaurant({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-96 md:pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 pt-18 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo</h3>
        <p className="mb-8 opacity-55">
          Escolha como prefere aproveitar sua refeição. <br />
          Estamos oferecendo praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/takeaway.png"
          imageAlt="Para levar"
          buttonText="Para levar"
          option="TAKE_AWAY"
        />
      </div>
    </div>
  );
}
