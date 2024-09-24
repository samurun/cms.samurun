import { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { axiosIns } from '@/lib/axiosIns';
import { IStack } from '@/types';

interface OptionType {
  label: string;
  value: string;
}

type Props = {
  values: string[];
  onSelect: (value: string[]) => void;
};

export default function InputStack({ values, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  const { data: options } = useQuery({
    queryKey: ['stack'],
    queryFn: () => axiosIns.get('/stacks').then((res) => res.data),
    select(data) {
      return data.map((stack: IStack) => {
        return {
          label: stack.name,
          value: stack.id,
        };
      });
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between  px-2'
        >
          <div className='flex gap-2 justify-start'>
            {values?.length
              ? values.slice(0, 4).map((val, i) => (
                  <div
                    key={i}
                    className='px-2 py-1 rounded-xl bg-secondary-foreground text-secondary border text-xs font-medium'
                  >
                    {
                      options?.find(
                        (option: OptionType) => option.value === val
                      )?.label
                    }
                  </div>
                ))
              : 'Select stack...'}
            {values?.length > 4 && (
              <div className='px-2 py-1 rounded-xl border border-dashed text-xs font-medium'>
                + {values?.length - 4} more
              </div>
            )}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput placeholder='Search stack...' />
          <CommandEmpty>No stack found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options?.map((option: OptionType) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    const newSet = new Set([...values, option.value]);
                    let newValues = Array.from(newSet);

                    if (values.includes(option.value)) {
                      newValues = newValues.filter(
                        (value) => value !== option.value
                      );
                    }
                    onSelect(newValues);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      values?.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
