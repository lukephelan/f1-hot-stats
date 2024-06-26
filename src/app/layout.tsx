import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from '@/app/ui/side-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'F1 Hot Stats',
  description: 'Formula 1 Statistics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
          <div className='w-full flex-none md:w-64 md:block'>
            <SideNav />
          </div>
          <div className='flex-grow p-6 md:overflow-y-auto md:p-4d'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
