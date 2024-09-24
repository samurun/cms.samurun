import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

type Props = {
  isLoading: boolean;
  children: ReactNode;
  fulllWidth?: boolean;
};

const SkeletonWrapper = ({ isLoading, children, fulllWidth }: Props) => {
  if (!isLoading) {
    return children;
  }

  return (
    <Skeleton className={cn(fulllWidth && 'w-full')}>
      <div className='opacity-0'>{children}</div>
    </Skeleton>
  );
};

export default SkeletonWrapper;
