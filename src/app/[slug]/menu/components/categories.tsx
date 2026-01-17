'use client';
import { useContext, useState } from 'react';

import Image from 'next/image';

import { ClockIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatCurrencyBRL } from '@/lib/format-currency';

import { Prisma } from '@prisma/generated/client';
import { CartContext } from '../contexts/cart';
import Products from './products';
import { CartSheet } from './cart-sheet';

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

export default function RestaurantCategories({
  restaurant,
}: RestaurantCategoriesProps) {
  const { products, total, toggleCart, totalQuantity } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);
  const handleCategorySelect = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? 'default' : 'secondary';
  };
  return (
    <div className="relative z-50 -mt-6 rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="lg:text-md mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>
      <ScrollArea className="c w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="cursor-pointer rounded-full"
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />
      { products.length > 0 && (
        <div className="flex w-full items-center justify-between border border-t bg-white px-3 py-5">
          <div>
            <p className="text-muted-foreground text-xs">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrencyBRL(total)}
              <span className="text-muted-foreground text-xs font-normal">
                / {totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'}
              </span>
            </p>
          </div>
          <Button onClick={toggleCart} className='cursor-pointer'>Ver Sacola</Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
}
