import Link from "next/link";
import { Product } from "../../../../../prisma/generated/client";
import Image from "next/image";

interface ProductsProps {
    products: Product[];
}
export default function Products({ products }: ProductsProps) {
 return (
   <div className="space-y-3 px-5">
        {products.map((product) => (
            <Link href="/" key={product.id} className="flex items-center justify-between border-b gap-10 py-3">
                <aside>
                    <h3 className="text-sm font-medium">
                        {product.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {product.description}
                    </p>
                    <p className="pt-3 text-sm font-semibold">
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(product.price)}
                    </p>
                </aside>

                <aside className="relative min-h-[82px] min-w-[120px]">
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