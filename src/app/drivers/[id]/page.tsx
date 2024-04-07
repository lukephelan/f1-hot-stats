import { fetchDriver, fetchDriverStats } from '@/app/lib/data/drivers';
import { BackButton } from '@/app/ui/buttons';
import { StatCard } from '@/app/ui/stats';
import Bio from '@/app/ui/drivers/bio';

export default async function Page({ params }: { params: { id: string } }) {
  const driver = await fetchDriver(params.id);
  const stats = await fetchDriverStats(params.id);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <h1 className='text-2xl'>
          {driver.name} {driver.code && `(${driver.code})`}
        </h1>
        <BackButton />
      </div>
      <Bio driver={driver} starts={stats.starts} />
      <div className='my-4 grid grid-cols-2 gap-4'>
        <StatCard
          label='Driver Championships'
          value={stats.championships.wins}
        />
        <StatCard label='Wins' value={stats.wins} />
        <StatCard label='Career Points' value={stats.careerPoints} />
        <StatCard label='Podiums' value={stats.podiums} />
        <StatCard label='Poles' value={stats.poles} />
        <StatCard label='Entries' value={stats.entries} />
      </div>
    </div>
  );
}
