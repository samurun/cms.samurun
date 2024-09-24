'use client';
import {
  BookA,
  Folder,
  GitPullRequest,
  LucideProps,
  Menu,
  Network,
  Package2,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';

const MENUS = [
  {
    key: '/projects',
    label: 'Projects',
    icon: Folder,
  },
  {
    key: '/stacks',
    label: 'Stacks',
    icon: Network,
  },
  {
    key: '/posts',
    label: 'Posts',
    icon: BookA,
  },
  {
    key: '/experiences',
    label: 'Experiences',
    icon: GitPullRequest,
  },
];

function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon className='size-5 md:size-4' />;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = useCallback(
    (key: string) => {
      return pathname.includes(key);
    },
    [pathname]
  );

  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link
          href='/'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <Package2 className='h-6 w-6' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        {MENUS.map((menu) => (
          <Link
            key={menu.key}
            href={menu.key}
            className={cn(
              'flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground',
              isActive(menu.key) && 'text-foreground'
            )}
          >
            {menu.icon ? <Icon icon={menu.icon} /> : null}
            {menu.label}
          </Link>
        ))}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle />
              <SheetDescription />
            </VisuallyHidden>
          </SheetHeader>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              href='/'
              className='flex items-center gap-2 text-lg font-semibold'
              onClick={(e) => setOpen(false)}
            >
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            {MENUS.map((menu) => (
              <Link
                key={menu.key}
                href={menu.key}
                className={cn(
                  'flex gap-2 items-center text-muted-foreground hover:text-foreground',
                  isActive(menu.key) && 'text-foreground'
                )}
                onClick={() => setOpen(false)}
              >
                {menu.icon ? <Icon icon={menu.icon} /> : null}
                {menu.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='size-8'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <p>{session?.user.username}</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={'/settings'}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut();
                deleteCookie('token');
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
