import CpfForm from './components/page'
;

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}
export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm />;
  }
  return <div>oi</div>;
}
