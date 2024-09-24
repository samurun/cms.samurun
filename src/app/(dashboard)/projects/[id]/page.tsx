'use client';
import ProjectForm from '@/components/project-form';
import SkeletonWrapper from '@/components/skeleton-wrapper';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosIns } from '@/lib/axiosIns';
import { cn } from '@/lib/utils';
import { ProjectSchemaType } from '@/schema';
import { IProject } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UpdateProject() {
  const parhname = usePathname();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['project', params.id],
    queryFn: () =>
      axiosIns
        .get(`/projects/${params.id}`)
        .then((res) => res.data as IProject),
    enabled: !!params.id,
  });

  console.log(data);

  const mutation = useMutation({
    mutationKey: ['update-project', params.id],
    mutationFn: async (payload: any) => {
      return axiosIns
        .patch(`/projects/${params.id}`, payload)
        .then((res) => res.data);
    },
    onMutate() {
      toast.loading('Updating...', { id: 'update-project' });
    },
    onSuccess(data, variables, context) {
      queryClient.refetchQueries({ queryKey: ['project'] });
      router.back();
      toast.success('Project has been updated', { id: 'update-project' });
    },
    onError(error, variables, context) {
      toast.error(error.message || 'Update fiald', { id: 'update-project' });
    },
  });

  return (
    <div className='container max-w-xl mt-10 space-y-4'>
      <section className='flex items-center gap-2 flec-col'>
        <Link
          href={'/projects'}
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
        >
          <ArrowLeft className=' w-3.5 h-3.5' />
        </Link>
        <p>{params.id}</p>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Update project</CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={isLoading}>
            <ProjectForm
              defaultValues={
                {
                  ...data,
                  stacks: data?.stacks.map((stack) => stack.id) || [],
                } as ProjectSchemaType
              }
              onFinished={(values: any) =>
                mutation.mutate({ ...values, stackIds: values.stacks })
              }
            />
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  );
}
