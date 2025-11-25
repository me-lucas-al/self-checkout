'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Product } from '../../../../../../prisma/generated/client';

interface ProductHeaderProps {
  product: Pick<Product, 'name' | 'imageUrl'>;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const router = useRouter();
  return (
    <div className="relative h-[300px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-50 rounded-full hover:cursor-pointer"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />

      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 z-50 rounded-full hover:cursor-pointer"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
