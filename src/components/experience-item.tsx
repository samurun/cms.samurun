import { ExperienceSchemaType } from '@/schema';
import { format } from 'date-fns';
import { formatCustomDistance } from '@/lib/utils';
import { Button } from './ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import DeleteExperienceButton from './delete-experience-button';
import UpdateExperienceButton from './update-experience-button';

interface Props extends ExperienceSchemaType {
  id: string;
}
export default function ExperienceItem({
  id,
  title,
  employment_type,
  company_name,
  location,
  location_type,
  start_date,
  end_date,
}: Props) {
  return (
    <div className='p-4 relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='ghost'
            className=' absolute top-4 right-0'
          >
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <UpdateExperienceButton id={id} />
          <DeleteExperienceButton id={id} />
        </DropdownMenuContent>
      </DropdownMenu>
      <h1 className='font-bold text-lg'>{title}</h1>
      <article className='flex gap-2'>
        <h2>{company_name}</h2>
        <span>·</span>
        <p className='capitalize'>{employment_type}</p>
      </article>
      <article className='flex gap-2 text-muted-foreground'>
        <time>
          {format(start_date, 'MMM yyyy')} -{' '}
          {end_date ? format(end_date, 'MMM yyyy') : 'Present'}
        </time>
        <span>·</span>
        <p>{formatCustomDistance(start_date, end_date)}</p>
      </article>
      <article className='flex gap-2 text-muted-foreground'>
        <p>{location}</p>
        <span>·</span>
        <p>{location_type}</p>
      </article>
    </div>
  );
}
