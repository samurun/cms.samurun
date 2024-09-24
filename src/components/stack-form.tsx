'use clinet';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { stackSchema, StackSchemaType } from '@/schema';

type Props = {
  defaultValues?: StackSchemaType;
  onFinish?: (value: StackSchemaType) => void;
};

export default function StackForm({ defaultValues, onFinish }: Props) {
  const form = useForm<StackSchemaType>({
    resolver: zodResolver(stackSchema),
    defaultValues: defaultValues || { stack: '' },
  });

  const onSubmit = (value: StackSchemaType) => {
    onFinish!(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='stack'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Save</Button>
      </form>
    </Form>
  );
}
