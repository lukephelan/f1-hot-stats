import { Circuit } from '@/app/lib/definitions';

export default function Bio({ circuit }: { circuit: Circuit }) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <div>Location: {circuit.location}</div>
      <div>Country: {circuit.country}</div>
    </div>
  );
}
