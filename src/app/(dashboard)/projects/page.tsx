import NewProjectButton from '@/components/new-project-button';
import ProjectTable from '@/components/project-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { File } from 'lucide-react';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Projects',
  description: '  Manage your projects and view their sales performance.',
};

export default function Projects() {
  return (
    <div className='container mt-10'>
      <div className='flex items-center justify-end gap-2'>
        <Button size='sm' variant='outline' className='h-8 gap-1'>
          <File className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Export
          </span>
        </Button>
        <NewProjectButton />
      </div>
      <Card className='mt-2'>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            Manage your projects and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectTable />
        </CardContent>
      </Card>
    </div>
  );
}
