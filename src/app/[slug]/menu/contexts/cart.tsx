'use client';
import { createContext, useState } from 'react';

import { Product } from '../../../../../prisma/generated/client';

export interface CartProduct
  extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };
  const addProduct = (product: CartProduct) => {
    const isAlreadyInCart = products.some(
      (prevProduct) => prevProduct.id === product.id
    );
    if (!isAlreadyInCart) return [...products, product];

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (isAlreadyInCart) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });

    const decreaseProductQuantity = (productId: string) => {
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) => {
          if (prevProduct.id !== productId || prevProduct.quantity === 1) {
            return prevProduct;
          }
          return { ...prevProduct, quantity: prevProduct.quantity - 1 };
        })
      );
    };

    const increaseProductQuantity = (productId: string) => {
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) => {
          if (prevProduct.id !== productId || prevProduct.quantity === 1) {
            return prevProduct;
          }
          return { ...prevProduct, quantity: prevProduct.quantity + 1 };
        })
      );
    };

    return (
      <CartContext.Provider
        value={{
          isOpen,
          products,
          toggleCart,
          addProduct,
          decreaseProductQuantity,
          increaseProductQuantity,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };
};
