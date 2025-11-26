'use client';
import Image from 'next/image';

import { Prisma } from '../../../../../../prisma/generated/client';
import { formatCurrencyBRL } from '@/lib/format-currency';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';


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
    <div className="relative z-50 -mt-6 rounded-t-3xl p-5">
      <div className="flex items-center gap-1.5 px-5">
        <Image
          src={product.restaurant.avatarImageUrl}
          alt={product.restaurant.name}
          width={16}
          height={16}
          className='rounded-full'
        />
        <p className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </p>
      </div>

      <h2 className="text-xl font-semibold">
        {product.name}
      </h2>

      <div className="flex items-center justify-between">
        <h3 className='text-xl font-semibold'>
          {formatCurrencyBRL(product.price)}
        </h3>
        <div className="flex items-center gap-3 text-center">
          <Button variant="outline" className='h-8 w-8 rounded-xl' onClick={handleDecreaseQuantity}>
            <ChevronLeftIcon />
          </Button>
          <p className="w-4">{quantity}</p>
          <Button variant="destructive" className='h-8 w-8 rounded-xl' onClick={handleIncreaseQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
