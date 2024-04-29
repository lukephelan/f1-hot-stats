import { Driver } from '@/app/lib/definitions';

export default function Bio({ driver }: { driver: Driver }) {
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
    </div>
  );
}
