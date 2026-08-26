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
  Store,
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

            {restaurants.length > 0 && (
              <Button
                asChild
                className="bg-amber-500 font-semibold text-neutral-950 shadow-sm transition-all hover:bg-amber-400 hover:shadow"
                size="sm"
              >
                <Link href={`#restaurantes`}>
                  Ver Restaurantes
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
            <span>Plataforma de Autoatendimento & Cardápio Digital</span>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Peça no seu restaurante favorito{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                sem filas e no seu ritmo
              </span>
            </h1>
            <p className="text-base font-normal text-neutral-600 sm:text-xl">
              O totem digital inteligente para você escolher refeições do McDonald&apos;s e dos melhores restaurantes, personalizar cada ingrediente e retirar com agilidade no balcão.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-neutral-600 sm:text-sm">
            <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Preparo rápido (5-10 min)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5">
              <UtensilsCrossed className="h-4 w-4 text-orange-600" />
              <span>Para comer no salão ou levar</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5">
              <CreditCard className="h-4 w-4 text-amber-600" />
              <span>Pagamento 100% digital</span>
            </div>
          </div>
        </section>

        <section id="restaurantes" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                <Store className="h-4 w-4" />
                <span>Restaurantes Disponíveis</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Escolha onde fazer seu pedido
              </h2>
            </div>
            <p className="text-sm text-neutral-500">
              {restaurants.length} {restaurants.length === 1 ? "restaurante disponível no totem" : "restaurantes disponíveis no totem"}
            </p>
          </div>

          {restaurants.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="relative">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 opacity-20 blur-xl transition duration-500 hover:opacity-30" />

                  <Card className="relative overflow-hidden rounded-2xl border-neutral-200 bg-white shadow-xl transition-all">
                    <div className="relative h-48 w-full bg-neutral-900 sm:h-64">
                      <Image
                        src={restaurant.coverImageUrl}
                        alt={`Capa do restaurante ${restaurant.name}`}
                        fill
                        priority
                        className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        <span>🍔</span>
                        <span>{restaurant._count.products} opções no cardápio</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between sm:left-6 sm:right-6">
                        <div className="flex items-center gap-3.5">
                          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-lg sm:h-20 sm:w-20">
                            <Image
                              src={restaurant.avatarImageUrl}
                              alt={`Logo ${restaurant.name}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-white">
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold tracking-tight sm:text-3xl">
                                {restaurant.name}
                              </h3>
                              <span className="rounded-md bg-amber-400/90 px-2 py-0.5 text-[10px] font-black uppercase text-neutral-950">
                                Opção Oficial
                              </span>
                            </div>
                            <p className="text-xs text-neutral-300 sm:text-sm">
                              {restaurant.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="space-y-6 p-6 sm:p-8">
                      <div className="flex flex-col justify-between gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center">
                        <div className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                            Autoatendimento Liberado
                          </span>
                          <h4 className="text-lg font-bold text-neutral-900">
                            Faça seu pedido no {restaurant.name}
                          </h4>
                          <p className="text-sm text-neutral-500">
                            Escolha se deseja comer no salão ou levar para viagem e monte sua refeição com personalização completa.
                          </p>
                        </div>

                        <Button
                          asChild
                          size="lg"
                          className="h-12 bg-neutral-900 px-8 text-base font-bold text-amber-400 shadow-lg shadow-neutral-900/20 transition-all hover:scale-[1.02] hover:bg-neutral-800 hover:text-amber-300"
                        >
                          <Link href={`/${restaurant.slug}`}>
                            Iniciar Pedido no Totem
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>

                      {restaurant.menuCategories.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span>Categorias em destaque</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {restaurant.menuCategories.map((category) => (
                              <Link
                                key={category.id}
                                href={`/${restaurant.slug}`}
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
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
              <div className="text-4xl">🏪</div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                Nenhum restaurante encontrado
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Execute o seed do banco de dados para carregar restaurantes e produtos.
              </p>
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Como funciona o autoatendimento?
            </h2>
            <p className="text-sm text-neutral-500">
              Faça seu pedido em 3 passos simples, rápidos e seguros
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-neutral-200 bg-white transition-all hover:border-amber-200 hover:shadow-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                    Passo 1
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Escolha onde comer
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Defina se prefere saborear sua refeição no restaurante ou retirar embalada para viagem.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white transition-all hover:border-orange-200 hover:shadow-md">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                  <Flame className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">
                    Passo 2
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Monte seu pedido
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Navegue pelas categorias do cardápio digital, selecione seus pratos favoritos e adicione acompanhamentos.
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
                    Finalize seu pagamento com segurança via Stripe, consulte seus pedidos pelo CPF e retire no balcão.
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
                Experiência de Totem Digital
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Pronto para fazer seu pedido?
              </h2>
              <p className="max-w-xl text-sm text-neutral-400 sm:text-base">
                Acesse o cardápio interativo e aproveite toda a conveniência de um autoatendimento rápido e prático.
              </p>
            </div>

            {restaurants.length > 0 && (
              <Button
                asChild
                size="lg"
                className="h-12 whitespace-nowrap bg-amber-400 px-8 text-base font-bold text-neutral-950 shadow-lg transition-all hover:scale-105 hover:bg-amber-300 hover:shadow-amber-400/20"
              >
                <Link href={`/${restaurants[0].slug}`}>
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
            Self Checkout • Totem de Autoatendimento para Restaurantes
          </p>
          <p className="text-neutral-400">
            Praticidade, inovação e sabor em cada pedido. Em caso de dúvidas, dirija-se ao balcão de atendimento.
          </p>
        </div>
      </footer>
    </div>
  );
}