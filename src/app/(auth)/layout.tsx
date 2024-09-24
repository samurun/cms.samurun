export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=' min-h-svh flex items-center justify-center'>
      {children}
    </div>
  );
}
