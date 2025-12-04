'use client'
import { createContext, useState } from 'react';

import { Product } from '../../../../../prisma/generated/client';

interface CardProduct extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CardProduct[];
  toggleCart: () => void;
  addProduct: (product: CardProduct) => void;

}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CardProduct[]>([]);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };
  const addProduct = (product: CardProduct ) => {
    setProducts((prev) => [...prev, product]);
  }
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
