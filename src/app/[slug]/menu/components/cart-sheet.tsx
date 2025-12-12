import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';

import { CartContext } from '../contexts/cart';
import CartProductItem from './cart-product-item';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrencyBRL } from '@/lib/format-currency';

export function CartSheet() {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="py-5">
          {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </div>
        <Card className='mb-6'>
          <CardContent className='p-5'>
            <div className="flex justify-between">
              <p className='text-sm text-muted-foreground'>Total</p>
              <p className='text-sm font-semibold'>{formatCurrencyBRL(total)}</p>
            </div>
          </CardContent>
        </Card>
        <SheetFooter>
          <Button type="submit">Finalizar Pedido</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
