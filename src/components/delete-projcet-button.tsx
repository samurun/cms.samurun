'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosIns } from '@/lib/axiosIns';
import { toast } from 'sonner';

import { DropdownMenuItem } from './ui/dropdown-menu';

type Props = {
  id: string;
};

export default function DeleteProjectButton({ id }: Props) {
  const queryClient = useQueryClient();
  const toastId = 'delete-project';

  const mutaion = useMutation({
    mutationKey: ['delete-project', id],
    mutationFn: (id: string) => {
      const url = `/projects/${id}`;
      return axiosIns.delete(url);
    },
    onMutate() {
      toast.loading('Project deleting...', { id: toastId });
    },
    onSuccess(data, variables, context) {
      toast.success('Project deleted', { id: toastId });
      queryClient.refetchQueries({ queryKey: ['project'] });
    },
    onError(error, variables, context) {
      toast.error('Project error', { id: toastId });
      console.error(error, variables);
    },
  });

  return (
    <DropdownMenuItem onClick={() => mutaion.mutate(id)}>
      Delete
    </DropdownMenuItem>
  );
}
