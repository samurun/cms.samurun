'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

const SETTING_MENUS = [
  {
    key: '/settings',
    label: 'General',
  },
  {
    key: '/settings/security',
    label: 'Security',
  },
  {
    key: '/settings/integrations',
    label: 'Integrations',
  },
  {
    key: '/settings/support',
    label: 'Support',
  },
  {
    key: '/settings/organizations',
    label: 'Organizations',
  },
  {
    key: '/settings/advanced',
    label: 'Advanced',
  },
];

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isActive = useCallback(
    (key: string) => {
      return pathname.endsWith(key);
    },
    [pathname]
  );

  return (
    <div className='container mt-10 flex flex-col gap-4'>
      <div className='mx-auto grid w-full max-w-6xl gap-2 md:sticky md:top-24'>
        <h1 className='text-3xl font-semibold'>Settings</h1>
      </div>
      <div className='mx-auto  grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <nav
          className='grid gap-4 text-sm text-muted-foreground md:sticky md:top-36'
          x-chunk='dashboard-04-chunk-0'
        >
          {SETTING_MENUS.map((menu) => (
            <Link
              key={menu.key}
              href={menu.key}
              className={cn(
                'font-semibold',
                isActive(menu.key) && 'text-primary'
              )}
            >
              {menu.label}
            </Link>
          ))}
        </nav>
        <div className='grid gap-6'>{children}</div>
      </div>
    </div>
  );
}
