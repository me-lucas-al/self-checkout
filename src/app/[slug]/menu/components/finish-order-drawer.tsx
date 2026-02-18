'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ConsumptionMethod } from '@prisma/generated/enums';
import { Loader2Icon } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const order = await createOrder({
        consumptionMethod: consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
      });

      if (!stripePublicKey) {
        throw new Error('Stripe public key is not defined.');
      }

      const { sessionUrl } = await createStripeCheckout({
        products,
        orderId: order.id,
        slug,
        consumptionMethod,
        cpf: data.cpf,
      });

      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        toast.error('Erro ao criar sessão de pagamento.');
      }
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      toast.error('Erro ao criar o pedido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira seus dados para concluir sua compra.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-5 max-h-[90vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-md mx-auto space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Digite seu nome..." 
                        className="h-12 rounded-lg"
                        {...field} 
                      />
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
                        placeholder="000.000.000-00"
                        customInput={Input}
                        className="h-12 rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DrawerFooter className="px-0 pt-4">
                <Button
                  className="w-full h-12 cursor-pointer rounded-full font-semibold"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className="animate-spin mr-2" />}
                  Finalizar Pedido
                </Button>
                <DrawerClose asChild>
                  <Button
                    className="w-full h-11 cursor-pointer rounded-full"
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