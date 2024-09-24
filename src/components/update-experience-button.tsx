import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import ExperienceForm from './experience-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosIns } from '@/lib/axiosIns';
import { ExperienceWithIdType } from './experience-list';
import SkeletonWrapper from './skeleton-wrapper';
import { toast } from 'sonner';
import { ExperienceSchemaType } from '@/schema';
import { format } from 'date-fns';
import { DropdownMenuItem } from './ui/dropdown-menu';

type Props = {
  id: string;
};

export default function UpdateExperienceButton({ id }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const toastId = 'update-experience';

  const { data, isLoading } = useQuery({
    queryKey: ['experience', id],
    queryFn: () =>
      axiosIns
        .get(`/experiences/${id}`)
        .then((res) => res.data as ExperienceWithIdType),
  });

  const mutation = useMutation({
    mutationKey: [toastId, id],
    mutationFn: (payload: ExperienceSchemaType) =>
      axiosIns.patch('/experiences', payload),
    onMutate() {
      toast.loading('Experience updating...', { id: toastId });
    },
    onSuccess(data, variables, context) {
      setOpen(false);
      toast.success('Experience updated', { id: toastId });
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
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Update
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update experience</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <SkeletonWrapper isLoading={isLoading}>
          {data && (
            <ExperienceForm
              defaultValues={{
                ...data,
                start_date: data?.start_date
                  ? new Date(data?.start_date)
                  : new Date(),
                end_date: data?.end_date ? new Date(data?.end_date) : null,
              }}
              onFinished={(values) => mutation.mutate(values)}
            />
          )}
        </SkeletonWrapper>
      </DialogContent>
    </Dialog>
  );
}
