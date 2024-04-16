import { Circuit } from '@/app/lib/definitions';

export default function Bio({ circuit }: { circuit: Circuit }) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <div>
        <span className='font-semibold'>Location:</span> {circuit.location}
      </div>
      <div>
        <span className='font-semibold'>Country:</span> {circuit.country}
      </div>
    </div>
  );
}
