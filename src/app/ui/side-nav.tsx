'use client';

import { FlagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import NavLinks from '@/app/ui/nav-links';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

function DesktopMenu() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2 hidden md:flex'>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <div className='flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium md:flex-none md:justify-start md:p-2 md:px-3 bg-cyan-900 text-white'>
          <FlagIcon className='h-5 w-5' aria-hidden='true' />
          <span>F1 Hot Stats!</span>
        </div>
        <NavLinks />
      </div>
    </div>
  );
}

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div
      className={clsx('md:hidden w-full bg-cyan-900 text-right', {
        'h-dvh': menuOpen,
      })}
    >
      <div className='flex justify-between align-items-center px-6 py-3'>
        <div className='text-white'>
          <FlagIcon className='h-5 w-5' aria-hidden='true' />
          <span>F1 Hot Stats!</span>
        </div>
        <button
          className='text-white font-semibold py-1 px-4'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className='h-5 w-5' aria-hidden='true' />
          ) : (
            <Bars3Icon className='h-5 w-5' aria-hidden='true' />
          )}
        </button>
      </div>
      <div className='bg-white'>{menuOpen && <NavLinks />}</div>
    </div>
  );
}

export default function SideNav() {
  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
}
