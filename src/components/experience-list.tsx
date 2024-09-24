'use client';
import { axiosIns } from '@/lib/axiosIns';
import { cn } from '@/lib/utils';
import { ExperienceSchemaType } from '@/schema';
import { useQuery } from '@tanstack/react-query';

import ExperienceItem from './experience-item';

// Define a new type with the id field
export type ExperienceWithIdType = ExperienceSchemaType & {
  id: string; // Adjust this type if you use a different ID format
};

type Props = {
  className?: string;
};

export default function ExperienceList({ className }: Props) {
  const { data: experiences } = useQuery<ExperienceWithIdType[]>({
    queryKey: ['experience'],
    queryFn: () => axiosIns.get('/experiences').then((res) => res.data),
  });

  return (
    <div
      className={cn(
        'relative space-y-4 bg-background divide-y rounded p-4',
        className
      )}
    >
      {experiences?.map((experience) => (
        <ExperienceItem
          key={experience.id}
          id={experience.id}
          title={experience.title}
          employment_type={experience.employment_type}
          company_name={experience.company_name}
          location={experience.location}
          location_type={experience.location_type}
          start_date={experience.start_date}
          end_date={experience.end_date}
          description={experience.description}
        />
      ))}
    </div>
  );
}
