import { IProject, IStack } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import DeleteProjectButton from '../delete-projcet-button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import UpdateProjectButton from '../update-project-button';
import { Badge, badgeVariants } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: 'image_cover',
    header: 'Cover',
    cell: ({ row }) => {
      const title = String(row.getValue('title'));
      const img = String(row.getValue('image_cover'));

      return (
        <article className='size-28 relative'>
          <Image
            src={img}
            alt={title}
            fill
            className='object-contain bg-secondary/60 rounded'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </article>
      );
    },
  },
  {
    accessorKey: 'title',
    // header: 'Title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = String(row.getValue('title'));
      return <p className='text-nowrap'>{title}</p>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = String(row.getValue('description'));
      return <p className='line-clamp-2'>{description}</p>;
    },
  },
  {
    accessorKey: 'stacks',
    header: 'Stacks',
    cell: ({ row }) => {
      const stacks: IStack[] = row.getValue('stacks');
      const maxDisplay = 3;

      return (
        <div className='flex gap-1.5'>
          {stacks.slice(0, maxDisplay).map((stack: IStack) => (
            <Badge variant='secondary' key={stack.id} className='text-nowrap'>
              {stack.name}
            </Badge>
          ))}
          {stacks.length > maxDisplay && (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    badgeVariants({ variant: 'outline' }),
                    'border-dashed'
                  )}
                >
                  +{stacks.length - maxDisplay}
                </button>
              </PopoverTrigger>
              <PopoverContent className='max-w-52 bg-secondary'>
                <div className='flex flex-wrap gap-1.5'>
                  {stacks.slice(maxDisplay, stacks.length).map((stack) => (
                    <Badge variant='default' key={stack.id}>
                      {stack.name}
                    </Badge>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell: ({ row }) => {
      const url = String(row.getValue('url'));
      return (
        <Link href={url} target='_blank' className='hover:underline'>
          {url}
        </Link>
      );
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UpdateProjectButton value={project} />
            </DropdownMenuItem>
            <DeleteProjectButton id={project.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
