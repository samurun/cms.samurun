'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import ExperienceForm from './experience-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExperienceSchemaType } from '@/schema';
import { axiosIns } from '@/lib/axiosIns';
import { toast } from 'sonner';

export default function NewExperienceButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const toastId = 'new-experience';

  const mutation = useMutation({
    mutationKey: ['new-experience'],
    mutationFn: (payload: ExperienceSchemaType) =>
      axiosIns.post('/experiences', payload),
    onMutate() {
      toast.loading('Experience creating...', { id: toastId });
    },
    onSuccess(data, variables, context) {
      setOpen(false);
      toast.success('Experience saved', { id: toastId });
      queryClient.refetchQueries({ queryKey: ['experience'] });
    },
    onError(error, variables, context) {
      toast.error('Experience error', { id: toastId });
      console.error(error, variables);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 gap-1' onClick={() => setOpen(true)}>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Add Experience
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Experience</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <ExperienceForm onFinished={(values) => mutation.mutate(values)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
