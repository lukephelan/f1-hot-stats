import { fetchConstructor } from '@/app/lib/data/constructors';
import PageHeader from '@/app/ui/page-header';
import Bio from '@/app/ui/constructors/bio';
import ConstructorStats from '@/app/ui/constructors/stats';

export default async function Page({ params }: { params: { id: string } }) {
  const constructorId = params.id;
  const constructor = await fetchConstructor(constructorId);

  return (
    <div className='w-full'>
      <PageHeader title={constructor.name} showBackButton={true} />
      <Bio f1Constructor={constructor} />
      <ConstructorStats constructorId={constructorId} />
    </div>
  );
}
