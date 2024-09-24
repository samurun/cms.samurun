'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { UseThemeProps } from 'next-themes/dist/types';
import SkeletonWrapper from './skeleton-wrapper';
import { useEffect } from 'react';
const MODES = [
  {
    title: 'light',
    icon: <SunIcon />,
  },
  {
    title: 'dark',
    icon: <MoonIcon />,
  },
  {
    title: 'system',
    icon: <DesktopIcon />,
  },
];

const themeSchema = z.object({
  theme: z.string(),
});

export default function SettingTheme() {
  const { setTheme, theme } = useTheme();

  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      theme: theme || 'system',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ theme }) => setTheme(theme))}
        className='w-2/3 space-y-6'
      >
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex gap-2'
                >
                  {MODES.map((mode) => (
                    <div
                      className='flex items-center col-auto'
                      key={mode.title}
                    >
                      <RadioGroupItem
                        value={mode.title}
                        id={mode.title}
                        hidden
                        className='aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"'
                      />
                      <Label
                        htmlFor={mode.title}
                        className='size-24 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col gap-2 items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                      >
                        {/* {mode.icon} */}
                        {/* <span className='mt-1 font-normal text-sm capitalize'> */}
                        {mode.title}
                        {/* </span> */}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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
