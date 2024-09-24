import { useMutation, useQueryClient } from '@tanstack/react-query';
import StackForm from './stack-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { axiosIns } from '@/lib/axiosIns';
import { toast } from 'sonner';
import { useState } from 'react';

type Props = {
  id: string;
  stack: string;
};

const toastId = 'update-stack';
export default function UpdateStackButton({ id, stack }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationKey: [toastId, id],
    mutationFn: (payload: { name: string }) =>
      axiosIns.patch(`/stacks/${id}`, payload).then((res) => res.data),
    onMutate(variables) {
      toast.loading('Updating...', { id: toastId });
    },
    onSuccess(data, variables, context) {
      setOpen(false);
      queryClient.refetchQueries({ queryKey: ['stack'] });
      toast.success('Updated successfully', { id: toastId });
    },
    onError(error, variables, context) {
      toast.error('Failed to update', { id: toastId });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          Update
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update stack</DialogTitle>
          <DialogDescription>
            Make changes to your stack here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <StackForm
            defaultValues={{ stack: stack }}
            onFinish={(value) => {
              mutation.mutate({ name: value.stack });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
