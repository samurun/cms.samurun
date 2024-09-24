'use client';
import { PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import ProjectForm from './project-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosIns } from '@/lib/axiosIns';
import { useState } from 'react';
import { toast } from 'sonner';
import { ScrollArea } from './ui/scroll-area';

export default function NewProjectButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const toastId = 'new-project';

  const mutation = useMutation({
    mutationKey: ['new-project'],
    mutationFn: (payload: any) => {
      const url = '/projects';
      return axiosIns.post(url, payload);
    },
    onMutate() {
      toast.loading('Project creating...', { id: toastId });
    },
    onSuccess(data, variables, context) {
      setOpen(false);
      toast.success('Project saved', { id: toastId });
      queryClient.refetchQueries({ queryKey: ['project'] });
    },
    onError(error, variables, context) {
      toast.error('Project error', { id: toastId });
      console.error(error, variables);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 gap-1' onClick={() => setOpen(true)}>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Add Project
          </span>
        </Button>
      </DialogTrigger>
      <ScrollArea>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            <ProjectForm
              onFinished={(values) =>
                mutation.mutate({ ...values, stackIds: values.stacks })
              }
            />
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
