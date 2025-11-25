import Image from 'next/image';
import { notFound } from 'next/navigation';

import { db } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({ where: { id: productId } });


  if (!product) {
    return notFound();
  }
  return (
    <div className="relative h-[300px] w-full">
        <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-50 rounded-full hover:cursor-pointer"
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
        className="absolute top-4 right-4 z-50 rounded-full hover:cursor-pointer">
          <ScrollTextIcon />
      </Button>
    </div>
  );
}
