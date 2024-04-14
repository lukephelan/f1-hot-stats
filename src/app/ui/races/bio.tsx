import { Race } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default function Bio({ race }: { race: Race }) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <div>Circuit: {race.circuit}</div>
      <div>Date: {formatDateToLocal(race.date.toString())}</div>
      <div>Round: {race.round}</div>
    </div>
  );
}
