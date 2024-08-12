import { F1Constructor } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Bio({
  f1Constructor,
}: {
  f1Constructor: F1Constructor;
}) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <div>
        <span className='font-semibold'>Nationality:</span>{' '}
        {f1Constructor.nationality}
      </div>
    </div>
  );
}
