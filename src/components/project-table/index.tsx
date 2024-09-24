'use client';

import { axiosIns } from '@/lib/axiosIns';
import { IProject } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from './data-table';
import { columns } from './columns';

export default function ProjectTable() {
  const { data } = useQuery({
    queryKey: ['project'],
    queryFn: () =>
      axiosIns.get('projects').then((res) => res.data as IProject[]),
  });

  return <DataTable data={data || []} columns={columns} />;
}
