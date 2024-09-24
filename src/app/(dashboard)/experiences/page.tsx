import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { File } from 'lucide-react';

import NewExperienceButton from '@/components/new-experience-button';
import ExperienceList from '@/components/experience-list';

export const metadata: Metadata = {
  title: 'Experiences',
  description: 'My ramblings on all things web dev.',
};
export default function Experiences() {
  return (
    <div className='container mt-10'>
      <div className='flex items-center justify-end gap-2'>
        <Button size='sm' variant='outline' className='h-8 gap-1'>
          <File className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Export
          </span>
        </Button>
        <NewExperienceButton />
      </div>
      <section className='mt-4'>
        <h1 className='text-lg font-bold'>Experience</h1>
      </section>
      <ExperienceList className='mt-4' />
    </div>
  );
}
