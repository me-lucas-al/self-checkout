import { useContext, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { formatCurrencyBRL } from '@/lib/format-currency';

import { CartContext } from '../contexts/cart';
import { CartProductItem } from './cart-product-item';
import { FinishOrderDrawer } from './finish-order-drawer';

export function CartSheet() {
  const [finishOrderDrawerIsOpen, setFinishOrderDrawerIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-10">
          {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </div>
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="flex justify-between">
              <p className="text-muted-foreground text-sm">Total</p>
              <p className="text-sm font-semibold">
                {formatCurrencyBRL(total)}
              </p>
            </div>
          </CardContent>
        </Card>
        <SheetFooter>
          <FinishOrderDrawer
            open={finishOrderDrawerIsOpen}
            onOpenChange={setFinishOrderDrawerIsOpen}
          >
            <Button
              className="cursor-pointer"
              type="submit"
              onClick={() => setFinishOrderDrawerIsOpen(true)}
            >
              Finalizar Pedido
            </Button>
          </FinishOrderDrawer>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
