'use client';
import { useContext, useState } from 'react';

import Image from 'next/image';

import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrencyBRL } from '@/lib/format-currency';

import { Prisma } from '../../../../../../prisma/generated/client';
import { CartContext } from '../../contexts/page';
import { CartSheet } from '../../components/cart-sheet';

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
  const { toggleCart, addProduct } = useContext(CartContext)
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    })
    toggleCart()
  }
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="relative z-50 -mt-6 flex flex-auto flex-col rounded-t-3xl p-5">
      <div className="flex-auto">
        <div className="mb-3 flex items-center gap-1.5">
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

        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrencyBRL(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 cursor-pointer rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 cursor-pointer rounded-xl"
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

        <ScrollArea className="h-full">
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1">
              <ChefHatIcon />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="text-muted-foreground list-disc px-5 text-sm">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient} className="">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      <Button className="mt-6 w-full cursor-pointer lg:m-auto lg:mb-2 lg:h-11 lg:w-[300px]" onClick={handleAddToCart}>
        Adicionar à sacola
      </Button>

      <CartSheet />
    </div>
  );
}
