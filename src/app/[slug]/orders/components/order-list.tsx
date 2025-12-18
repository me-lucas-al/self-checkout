import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Prisma } from '../../../../../prisma/generated/client';
import OrderItem from './order-item';

export interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-6 p-6">
      <Button size="icon" variant="secondary" className="rounded-full">
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      <OrderItem orders={orders} />
    </div>
  );
}
