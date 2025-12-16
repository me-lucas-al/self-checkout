import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import { Product } from '../../../../../prisma/generated/client';
import { formatCurrencyBRL } from '@/lib/format-currency';

interface ProductsProps {
  products: Product[];
}
export default function Products({ products }: ProductsProps) {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams()
  const consumptionMethod = searchParams.get('consumptionMethod');
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          key={product.id}
          className="flex items-center justify-between gap-10 border-b py-3 cursor-pointer"
        >
          <aside>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm lg:w-[85vw]">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrencyBRL(product.price)}
            </p>
          </aside>

          <aside className="relative min-h-[82px] min-w-[120px] lg:mr-6">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </aside>
        </Link>
      ))}
    </div>
  );
}
