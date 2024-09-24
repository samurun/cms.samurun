import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle, File } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'My ramblings on all things web dev.',
};
export default function Posts() {
  return (
    <div className='container mt-10'>
      <div className='flex items-center justify-end gap-2'>
        <Button size='sm' variant='outline' className='h-8 gap-1'>
          <File className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Export
          </span>
        </Button>
        <Button size='sm' className='h-8 gap-1'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Add Post
          </span>
        </Button>
      </div>
      <Card className='mt-2'>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>My ramblings on all things web dev.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
