import Image from 'next/image';

import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatCurrencyBRL } from '@/lib/format-currency';

import { CartProduct } from '../contexts/cart';

interface CartProductItemProps {
  product: CartProduct;
}
export default function CartProductItem({ product }: CartProductItemProps) {
  return (
    <main className="flex items-center justify-between">
      <section className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrencyBRL(product.price)}
          </p>

          <div className="flex items-center gap-1">
            <Button className="h-7 w-7 rounded-lg" variant="outline">
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button className="h-7 w-7 rounded-lg" variant="destructive">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </section>

      <section>
        <Button className="h-7 w-7 rounded-lg" variant="outline">
          <TrashIcon />
        </Button>
      </section>
    </main>
  );
}
