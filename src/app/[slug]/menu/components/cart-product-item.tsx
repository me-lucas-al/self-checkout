import { useContext } from 'react';

import Image from 'next/image';

import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatCurrencyBRL } from '@/lib/format-currency';

import { CartContext, CartProduct } from '../contexts/cart';

interface CartItemProps {
  product: CartProduct;
}

export function CartProductItem({ product }: CartItemProps) {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext);
  return (
    <div className="flex w-full items-center gap-2">
      <div className="ml-2 flex flex-1 items-center gap-3">
        <div className="relative h-20 w-20 shrink-0 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-xs text-ellipsis">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrencyBRL(product.price)}
          </p>
          <div className="flex max-w-[70%] items-center gap-1 text-center">
            <Button
              className="h-7 w-7 cursor-pointer rounded-lg"
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              className="h-7 w-7 cursor-pointer rounded-lg"
              variant="destructive"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button
       className="ml-auto h-7 w-7 shrink-0 cursor-pointer rounded-lg mr-4"
        variant="outline"
        onClick={() => removeProduct(product.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}
