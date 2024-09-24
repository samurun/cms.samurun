'use client';
import { PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosIns } from '@/lib/axiosIns';
import { toast } from 'sonner';
import { StackSchemaType } from '@/schema';

const formSchema = z.object({
  stack: z.string().min(2).max(50),
});

const toastId = 'new-stack';

export default function NewStackButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  // 1. Define your form.
  const form = useForm<StackSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stack: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: StackSchemaType) {
    mutation.mutate(values.stack);
  }

  const mutation = useMutation({
    mutationKey: ['new-stack'],
    mutationFn: (stack: string) => axiosIns.post('/stacks', { name: stack }),
    onMutate() {
      toast.loading('New stack is creating...', { id: toastId });
    },
    onSuccess() {
      form.reset();
      queryClient.refetchQueries({ queryKey: ['stack'] });
      toast.success('New stack created successfully', { id: toastId });
    },
    onError(error: Error | any) {
      const msg = error?.response.data.message || 'New stack are errored';
      toast.error(msg, { id: toastId });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 gap-1'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Add Stack
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New stack</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='stack'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Enter stack' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
