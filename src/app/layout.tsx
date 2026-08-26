import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { CartProvider } from './[slug]/menu/contexts/cart';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: "McDonald's | Totem Self-Checkout",
  description:
    "Faça seu pedido rápido e fácil no totem digital do McDonald's. Escolha para comer no local ou levar com toda comodidade.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Toaster/>
      </body>
    </html>
  );
}
