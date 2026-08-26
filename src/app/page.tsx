import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Flame,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { db } from "@/lib/prisma";

export default async function Home() {
  const restaurants = await db.restaurant.findMany({
    include: {
      menuCategories: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  const featuredRestaurant = restaurants[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo size="md" href="/" />

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Totem Digital Ativo
            </div>

            {featuredRestaurant && (
              <Button
                asChild
                className="bg-red-600 font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow"
                size="sm"
              >
                <Link href={`/${featuredRestaurant.slug}`}>
                  Fazer Pedido
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6 sm:py-14">
        <section className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Totem de Autoatendimento Oficial</span>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Peça seu <span className="text-red-600">Méqui favorito</span> sem filas e no seu tempo
            </h1>
            <p className="text-base font-normal text-neutral-600 sm:text-xl">
              O sabor inconfundível do McDonald&apos;s na ponta dos seus dedos. Faça seu pedido no totem digital, personalize cada detalhe e retire quentinho no balcão.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-neutral-600 sm:text-sm">
            <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Preparo rápido (5-10 min)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5">
              <UtensilsCrossed className="h-4 w-4 text-red-600" />
              <span>Para comer aqui ou levar</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5">
              <CreditCard className="h-4 w-4 text-amber-600" />
              <span>Pagamento 100% digital</span>
            </div>
          </div>
        </section>

        {featuredRestaurant ? (
          <section className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 opacity-20 blur-xl transition duration-500 hover:opacity-30" />
            
            <Card className="relative overflow-hidden rounded-2xl border-neutral-200 bg-white shadow-xl transition-all">
              <div className="relative h-48 w-full bg-neutral-900 sm:h-64">
                <Image
                  src={featuredRestaurant.coverImageUrl}
                  alt={`Capa ${featuredRestaurant.name}`}
                  fill
                  priority
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  🍔 {featuredRestaurant._count.products} itens disponíveis
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between sm:left-6 sm:right-6">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-lg sm:h-20 sm:w-20">
                      <Image
                        src={featuredRestaurant.avatarImageUrl}
                        alt={`Logo ${featuredRestaurant.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-white">
                      <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
                        {featuredRestaurant.name}
                      </h2>
                      <p className="text-xs text-neutral-300 sm:text-sm">
                        {featuredRestaurant.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                      Autoatendimento Liberado
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900">
                      Pronto para montar sua McOferta?
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Toque no botão ao lado para escolher seu método de consumo e abrir o cardápio.
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="h-12 bg-red-600 px-8 text-base font-bold text-white shadow-lg shadow-red-600/25 transition-all hover:scale-[1.02] hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30"
                  >
                    <Link href={`/${featuredRestaurant.slug}`}>
                      Iniciar Pedido no Totem
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {featuredRestaurant.menuCategories.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      <Flame className="h-4 w-4 text-amber-500" />
                      <span>Categorias disponíveis neste totem</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {featuredRestaurant.menuCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/${featuredRestaurant.slug}`}
                          className="group flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-amber-400 hover:bg-amber-50 hover:text-neutral-900"
                        >
                          <span>{category.name}</span>
                          <span className="text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-600">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
            <div className="text-4xl">🍔</div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              Nenhum restaurante configurado
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Execute o seed do banco de dados para carregar o restaurante e os produtos.
            </p>
          </div>
        )}

        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Como funciona o autoatendimento?
            </h2>
            <p className="text-sm text-neutral-500">
              Faça seu pedido em 3 passos simples e intuitivos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-neutral-200 bg-white transition-all hover:border-red-200 hover:shadow-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                    Passo 1
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Escolha onde comer
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Defina se deseja saborear seu lanche no restaurante ou levar para viagem com embalagem prática.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white transition-all hover:border-amber-200 hover:shadow-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <Flame className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                    Passo 2
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Monte seu combo
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Selecione seus sanduíches favoritos, acompanhamentos crocantes, bebidas e sobremesas geladas.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white transition-all hover:border-emerald-200 hover:shadow-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                    Passo 3
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Pague e retire
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Realize o pagamento seguro via Stripe, acompanhe seu pedido pelo CPF e retire pronto no balcão.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-neutral-900 p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-400/20">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Experiência McDonald&apos;s Express
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Bateu aquela fome? Peça agora mesmo!
              </h2>
              <p className="max-w-xl text-sm text-neutral-400 sm:text-base">
                Acesse o cardápio oficial, confira os lançamentos e viva a melhor experiência gastronômica de autoatendimento.
              </p>
            </div>

            {featuredRestaurant && (
              <Button
                asChild
                size="lg"
                className="h-12 whitespace-nowrap bg-amber-400 px-8 text-base font-bold text-neutral-950 shadow-lg transition-all hover:scale-105 hover:bg-amber-300 hover:shadow-amber-400/20"
              >
                <Link href={`/${featuredRestaurant.slug}`}>
                  Acessar Cardápio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        <div className="mx-auto max-w-6xl space-y-3 px-4 sm:px-6">
          <div className="flex justify-center">
            <Logo size="sm" href="/" />
          </div>
          <p className="font-medium text-neutral-700">
            McDonald&apos;s Self Checkout • Totem de Autoatendimento Digital
          </p>
          <p className="text-neutral-400">
            Praticidade, sabor e tecnologia em cada mordida. Em caso de dúvidas, consulte nossos atendentes no balcão.
          </p>
        </div>
      </footer>
    </div>
  );
}