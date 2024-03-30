import { fetchCircuit } from '@/app/lib/data/circuits';
import { BackButton } from '@/app/ui/buttons';

export default async function Page({ params }: { params: { id: string } }) {
  const circuit = await fetchCircuit(params.id);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <h1 className='text-2xl'>{circuit.name}</h1>
        <BackButton />
      </div>
    </div>
  );
}
