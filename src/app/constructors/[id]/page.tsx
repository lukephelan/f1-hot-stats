import { fetchConstructor } from '@/app/lib/data/constructors';
import { BackButton } from '@/app/ui/buttons';

export default async function Page({ params }: { params: { id: string } }) {
  const constructor = await fetchConstructor(params.id);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between pb-5'>
        <h1 className='text-2xl'>{constructor.name}</h1>
        <BackButton />
      </div>
    </div>
  );
}
