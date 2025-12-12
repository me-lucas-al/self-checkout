'use client';

import { useContext, useState } from 'react';

import Image from 'next/image';

import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrencyBRL } from '@/lib/format-currency';

import { Prisma } from '../../../../../../prisma/generated/client';
import { CartSheet } from '../../components/cart-sheet';
import { CartContext } from '../../contexts/cart';

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
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };

  return (
    <div className="relative z-50 -mt-6 flex h-full flex-col rounded-t-3xl bg-white p-5 shadow-xl">
      <div className="flex-1 overflow-hidden">
        <div className="mb-3 flex items-center gap-1.5">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              fill
              className="object-cover"
            />
          </div>
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
              size="icon"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full pb-6">
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-muted-foreground text-sm">
              {product.description}
            </p>
          </div>

          <div className="mt-6 space-y-3 pb-4">
            <div className="flex items-center gap-1">
              <ChefHatIcon size={18} />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="text-muted-foreground list-disc px-5 text-sm">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>

      <div className="flex items-center pt-4">
        <Button
          className="m-auto w-full cursor-pointer py-6 font-semibold lg:m-auto lg:mb-2 lg:h-11 lg:w-[300px]"
          onClick={handleAddToCart}
        >
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </div>
  );
}
