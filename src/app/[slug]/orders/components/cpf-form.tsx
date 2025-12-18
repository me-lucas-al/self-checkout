'use client';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { usePathname, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
import { removeCpfPunctuation, validateCPF } from '@/lib/validate-cpf';

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, { message: 'O CPF é obrigatório' })
    .refine((value) => validateCPF(value), { message: 'CPF inválido' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CpfForm() {
  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const pathname = usePathname();
  const onSubmit = (data: FormSchema) => {
    router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>
            Informe seu CPF para visualizar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <div className="flex h-full w-full items-center justify-center">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-md sm:max-w-lg space-y-8"
            >
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="px-4">
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
                <Button className="w-full cursor-pointer rounded-full">
                  Confirmar
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer rounded-full"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
