import Footer from '@/components/footer';
import Header from '@/components/header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-200px)]'>
        {children}
      </main>
      <Footer />
    </>
  );
}
