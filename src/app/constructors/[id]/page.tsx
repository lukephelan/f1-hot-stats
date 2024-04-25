import { Suspense } from 'react';
import { fetchConstructor } from '@/app/lib/data/constructors';
import PageHeader from '@/app/ui/page-header';
import Bio from '@/app/ui/constructors/bio';
import ConstructorStats from '@/app/ui/constructors/stats';
import { StatsSkeleton } from '@/app/ui/skeletons';

export default async function Page({ params }: { params: { id: string } }) {
  const constructorId = params.id;
  const constructor = await fetchConstructor(constructorId);

  return (
    <div className='w-full'>
      <PageHeader title={constructor.name} showBackButton={true} />
      <Bio f1Constructor={constructor} />
      <Suspense fallback={<StatsSkeleton cardCount={8} />}>
        <ConstructorStats constructorId={constructorId} />
      </Suspense>
    </div>
  );
}
