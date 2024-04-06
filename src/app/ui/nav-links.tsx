'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Drivers', href: '/drivers' },
  { name: 'Constructors', href: '/constructors' },
  { name: 'Seasons', href: '/seasons' },
  { name: 'Races', href: '/races' },
  { name: 'Circuits', href: '/circuits' },
  {},
  { name: 'Acknowledgements', href: '/acknowledgements' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, index) => {
        if (link.name) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-cyan-600 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-white':
                    pathname.split('/')[1] === link.href.split('/')[1],
                }
              )}
            >
              <p className='hidden md:block'>{link.name}</p>
            </Link>
          );
        } else {
          return (
            <div
              key={`space-${index}`}
              className='hidden h-auto w-full grow rounded-md md:block'
            ></div>
          );
        }
      })}
    </>
  );
}
