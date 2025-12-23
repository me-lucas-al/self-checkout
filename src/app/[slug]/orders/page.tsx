import { db } from '@/lib/prisma';
import { removeCpfPunctuation, validateCPF } from '@/lib/validate-cpf';

import CpfForm from './components/cpf-form';
import OrderList from './components/order-list';

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}
export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { cpf } = await searchParams;
  if (!cpf || !validateCPF(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: { 
      customerCpf: removeCpfPunctuation(cpf) 
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      }
    }
  });
  return <OrderList orders={orders} />;
}
