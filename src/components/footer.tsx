import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='py-6 md:px-8 md:py-0'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
        <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
          Built by
          <Link
            href='https://x.com/shadcn'
            target='_blank'
            className='font-medium underline underline-offset-4 ml-1'
          >
            shadcn
          </Link>
          . The source code is available on
          <Link
            href='https://github.com/shadcn-ui/ui'
            target='_blank'
            className='font-medium underline underline-offset-4 ml-1'
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
