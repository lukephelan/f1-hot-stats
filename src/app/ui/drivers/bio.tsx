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
      {driver.number && <div>Number: {driver.number}</div>}
      {driver.code && <div>Code: {driver.code}</div>}
      <div>Nationality: {driver.nationality}</div>
      <div>
        First start: {starts.firstStartName} (
        {formatDateToLocal(starts.firstStartDate.toString())})
      </div>
      <div>
        Last start: {starts.lastStartName} (
        {formatDateToLocal(starts.lastStartDate.toString())})
      </div>
    </div>
  );
}
