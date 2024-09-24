import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { axiosIns } from '@/lib/axiosIns';
import { toast } from 'sonner';
type Props = {
  id: string;
};
export default function DeleteExperienceButton({ id }: Props) {
  const queryClient = useQueryClient();
  const toastId = 'delete-experience';

  const mutaion = useMutation({
    mutationKey: [toastId, id],
    mutationFn: (id: string) => {
      const url = `/experiences/${id}`;
      return axiosIns.delete(url);
    },
    onMutate() {
      toast.loading('Experience deleting...', { id: toastId });
    },
    onSuccess(data, variables, context) {
      toast.success('Experience deleted', { id: toastId });
      queryClient.refetchQueries({ queryKey: ['experience'] });
    },
    onError(error, variables, context) {
      toast.error('Experience error', { id: toastId });
      console.error(error, variables);
    },
  });
  return <DropdownMenuItem>Delete</DropdownMenuItem>;
}
