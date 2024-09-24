'use client';
import { projectSchema, ProjectSchemaType } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { UploadIcon } from '@radix-ui/react-icons';
import { Label } from './ui/label';
import Image from 'next/image';
import { IProject } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { axiosIns } from '@/lib/axiosIns';
import { toast } from 'sonner';
import SkeletonWrapper from './skeleton-wrapper';
import InputStack from './input-stack';

type Props = {
  defaultValues?: ProjectSchemaType;
  onFinished: (value: any) => void;
};

export default function ProjectForm({ defaultValues, onFinished }: Props) {
  // 1. Define your form.
  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      image_cover: '',
      stacks: [],
      url: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ProjectSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onFinished(values);
  }

  const mutation = useMutation({
    mutationKey: ['upload'],
    mutationFn: (file: any) => {
      const formData = new FormData();
      formData.append('file', file);
      return axiosIns
        .post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data);
    },
    onMutate() {
      toast.loading('Uploading...', { id: 'upload' });
    },
    onSuccess(data, variables, context) {
      const newImageurl = data.url;
      form.setValue('image_cover', newImageurl);
      form.trigger('image_cover');
      toast.success('Uploaded', { id: 'upload' });
    },
    onError(error, variables, context) {
      toast.error(error.message || 'Upload fiald', { id: 'upload' });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='image_cover'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <Label htmlFor='picture'>
                  <SkeletonWrapper isLoading={mutation.isPending}>
                    <div className='flex flex-col items-center justify-center gap-2 aspect-video border border-dashed rounded-md relative cursor-pointer mt-2 z-0'>
                      {field.value ? (
                        <Image
                          src={field.value}
                          fill
                          alt=''
                          className=' object-contain'
                        />
                      ) : (
                        <>
                          <div className='aspect-square border border-dashed rounded-full p-3'>
                            <UploadIcon />
                          </div>
                          <p className='text-muted-foreground font-normal text-xs'>
                            Click to upload file
                          </p>
                        </>
                      )}
                      <Input
                        id='picture'
                        type='file'
                        className=' hidden'
                        onChange={(e) => {
                          mutation.mutate(e?.target?.files![0]);
                        }}
                      />
                    </div>
                  </SkeletonWrapper>
                </Label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder='' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='stacks'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stacks</FormLabel>
              <FormControl>
                <InputStack
                  values={field.value}
                  onSelect={(values) => {
                    form.setValue('stacks', values as any);
                  }}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          {defaultValues ? 'Update' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
