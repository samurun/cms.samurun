import { IProject } from '@/types';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
type Props = {
  value: IProject;
};

export default function UpdateProjectButton({ value }: Props) {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/${value.id}`} className='w-full'>
      Update
    </Link>
  );
}
