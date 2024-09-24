'use client';

import { axiosIns } from '@/lib/axiosIns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge } from './ui/badge';
import { Cross2Icon, MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';

const toatId = 'delete-stack';

export default function StackList() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['stack'],
    queryFn: () =>
      axiosIns
        .get('/stacks')
        .then((res) => res.data as { id: string; name: string }[]),
  });

  const mutation = useMutation({
    mutationKey: ['delete-stack'],
    mutationFn: (id: string) => axiosIns.delete('/stacks/' + id),
    onMutate() {
      toast.loading('Stack is deleting...', { id: toatId });
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['stack'] });
      toast.success('Stack deleted successfully', { id: toatId });
    },
    onError() {
      toast.error('Delete stack are errored', { id: toatId });
    },
  });
  return (
    <div className='flex flex-wrap gap-2'>
      {data?.map((stack) => (
        <div
          key={stack.id}
          className='inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium shadow-sm'
        >
          <span>{stack.name}</span>
          <button
            type='button'
            className='ml-2 -mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary-foreground hover:bg-primary-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            <XIcon
              className='h-3 w-3'
              onClick={() => mutation.mutate(stack.id)}
            />
            <span className='sr-only'>Remove badge</span>
          </button>
        </div>
      ))}
    </div>
  );
}
