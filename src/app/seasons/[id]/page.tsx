import { fetchSeason } from '@/app/lib/data/seasons';
import { BackButton } from '@/app/ui/buttons';

export default async function Page({ params }: { params: { id: string } }) {
  const season = await fetchSeason(params.id);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <h1 className='text-2xl'>Season {season.year}</h1>
        <BackButton />
      </div>
    </div>
  );
}
