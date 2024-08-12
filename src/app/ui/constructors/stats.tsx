import { formatDateToLocal } from '@/app/lib/utils';
import { fetchConstructorStats } from '@/app/lib/data/constructors';
import { StatCard } from '@/app/ui/stats';

export default async function ConstructorStats({
  constructorId,
}: {
  constructorId: string;
}) {
  const stats = await fetchConstructorStats(constructorId);
  const firstStart = `${stats.starts.firstStartName} (${formatDateToLocal(stats.starts.firstStartDate.toString())})`;
  const lastStart = `${stats.starts.lastStartName} (${formatDateToLocal(stats.starts.lastStartDate.toString())})`;

  return (
    <div className='my-4 grid grid-cols-2 gap-4'>
      <StatCard label='First Start' value={firstStart} />
      <StatCard label='Last Start' value={lastStart} />
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
  );
}
