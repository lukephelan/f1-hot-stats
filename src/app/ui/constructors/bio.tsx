import { F1Constructor } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Bio({
  f1Constructor,
  starts,
}: {
  f1Constructor: F1Constructor;
  starts: {
    firstStartName: string;
    lastStartName: string;
    firstStartDate: Date;
    lastStartDate: Date;
  };
}) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <div>
        <span className='font-semibold'>Nationality:</span>{' '}
        {f1Constructor.nationality}
      </div>
      <div>
        <span className='font-semibold'>First start:</span>{' '}
        {starts.firstStartName} (
        {formatDateToLocal(starts.firstStartDate.toString())})
      </div>
      <div>
        <span className='font-semibold'>Last start:</span>{' '}
        {starts.lastStartName} (
        {formatDateToLocal(starts.lastStartDate.toString())})
      </div>
    </div>
  );
}
