import { Race } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Bio({ race }: { race: Race }) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <div>
        <span className='font-semibold'>Circuit:</span> {race.circuit}
      </div>
      <div>
        <span className='font-semibold'>Date:</span>{' '}
        {formatDateToLocal(race.date.toString())}
      </div>
      <div>
        <span className='font-semibold'>Round:</span> {race.round}
      </div>
    </div>
  );
}
