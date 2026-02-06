'use client';
import { useContext, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { useParams, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ConsumptionMethod } from '@prisma/generated/enums';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { createOrder } from '@/app/[slug]/actions/create-order';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { validateCPF } from '@/lib/validate-cpf';

import { createStripeCheckout } from '../../actions/create-stripe-checkout';
import { CartContext } from '../contexts/cart';

const formSchema = z.object({
  name: z.string().trim().min(2, { message: 'O nome é obrigatório' }),
  cpf: z
    .string()
    .trim()
    .min(1, { message: 'O CPF é obrigatório' })
    .refine((value) => validateCPF(value), { message: 'CPF inválido' }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function FinishOrderDrawer({
  children,
  open,
  onOpenChange,
}: FinishOrderDrawerProps) {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get(
    'consumptionMethod'
  ) as ConsumptionMethod;
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cpf: '',
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
        await createOrder({
          consumptionMethod: consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products,
          slug,
        });
        if (!stripePublicKey) {
          throw new Error('Stripe public key is not defined.');
        }
        const { sessionId, sessionUrl } = await createStripeCheckout({
          products,
        });
        if (sessionUrl) {
          window.location.href = sessionUrl;
        } else {
          toast.error('Erro ao criar sessão de pagamento.');
        }

    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      toast.error('Erro ao criar o pedido.');
    }
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira as suas informações abaixo para finalizar o pedido
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5 lg:flex lg:justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-md space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="###.###.###-##"
                        placeholder="Digite seu CPF..."
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  className="w-full cursor-pointer rounded-full"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button
                    className="w-full cursor-pointer rounded-full"
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
