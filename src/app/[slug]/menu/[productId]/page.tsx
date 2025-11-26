import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/prisma';

import ProductDetails from './components/product-details';
import ProductHeader from './components/product-header';

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }
  return (
    <>
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </>
  );
}
