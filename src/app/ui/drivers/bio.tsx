import { Driver } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Bio({
  driver,
  starts,
}: {
  driver: Driver;
  starts: {
    firstStartName: string;
    lastStartName: string;
    firstStartDate: Date;
    lastStartDate: Date;
  };
}) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      {driver.number && (
        <div>
          <span className='font-semibold'>Number:</span> {driver.number}
        </div>
      )}
      {driver.code && (
        <div>
          <span className='font-semibold'>Code:</span> {driver.code}
        </div>
      )}
      <div>
        <span className='font-semibold'>Nationality:</span> {driver.nationality}
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
