import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
  const restaurants = await db.restaurant.findMany();

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Self Checkout
          </h1>
          <p className="text-lg text-neutral-600">
            Escolha um restaurante para ver o cardápio e fazer seu pedido
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Link 
              key={restaurant.id} 
              href={`/${restaurant.slug}`} 
              className="group block h-full"
            >
              <Card className="h-full overflow-hidden border-neutral-200 transition-all hover:border-primary/50 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-32 w-full bg-neutral-200">
                    <Image
                      src={restaurant.coverImageUrl}
                      alt={`Capa do restaurante ${restaurant.name}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="relative px-4 pb-4 pt-10">
                    <div className="absolute -top-8 left-4 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm">
                      <Image
                        src={restaurant.avatarImageUrl}
                        alt={`Logo do restaurante ${restaurant.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h2 className="font-bold text-lg text-neutral-900 group-hover:text-primary">
                          {restaurant.name}
                        </h2>
                        <p className="text-sm text-neutral-500 line-clamp-2">
                          {restaurant.description}
                        </p>
                      </div>

                      <Button className="w-full cursor-pointer" variant="secondary">
                        <Link href={`/${restaurant.slug}`}>
                          Ver Cardápio
                        </Link>

                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {restaurants.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white p-12 text-center">
            <div className="h-12 w-12 text-neutral-400">🏪</div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              Nenhum restaurante encontrado
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}