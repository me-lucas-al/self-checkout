'use client';
import { useState } from 'react';

import Image from 'next/image';

import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatCurrencyBRL } from '@/lib/format-currency';

import { Prisma } from '../../../../../../prisma/generated/client';

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}
export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="relative z-50 -mt-6 flex flex-auto flex-col rounded-t-3xl p-5">
      <div className="flex-auto">
        <div className="flex items-center gap-1.5 mb-3">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-muted-foreground text-xs">
            {product.restaurant.name}
          </p>
        </div>

        <h2 className="text-xl font-semibold">{product.name}</h2>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrencyBRL(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl cursor-pointer"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl cursor-pointer"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1">
            <ChefHatIcon />
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>
      </div>

      <Button className="mt-6 w-full lg:w-[300px] lg:m-auto cursor-pointer lg:mb-2 lg:h-11">Adicionar à sacola</Button>
    </div>
  );
}
