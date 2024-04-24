import {
  fetchConstructor,
  fetchConstructorDrivers,
  fetchConstructorStats,
} from '@/app/lib/data/constructors';
import PageHeader from '@/app/ui/page-header';
import { StatCard } from '@/app/ui/stats';
import Bio from '@/app/ui/constructors/bio';
import ConstructorDrivers from '@/app/ui/constructors/drivers';

export default async function Page({ params }: { params: { id: string } }) {
  const constructor = await fetchConstructor(params.id);
  const stats = await fetchConstructorStats(params.id);
  const constructorDrivers = await fetchConstructorDrivers(params.id);

  return (
    <div className='w-full'>
      <PageHeader title={constructor.name} showBackButton={true} />
      <Bio f1Constructor={constructor} starts={stats.starts} />
      <div className='my-4 grid grid-cols-2 gap-4'>
        <StatCard
          label='Constructor Championships'
          value={stats.championships.wins}
        />
        <StatCard label='Wins' value={stats.wins} />
        <StatCard label='Career Points' value={stats.careerPoints} />
        <StatCard label='Podiums' value={stats.podiums} />
        <StatCard label='Poles' value={stats.poles} />
        <StatCard label='Entries' value={stats.entries} />
      </div>
      <ConstructorDrivers constructorDrivers={constructorDrivers} />
    </div>
  );
}
