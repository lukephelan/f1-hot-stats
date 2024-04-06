import { FlagIcon } from '@heroicons/react/20/solid';
import NavLinks from '@/app/ui/nav-links';

export default function SideNav() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
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
