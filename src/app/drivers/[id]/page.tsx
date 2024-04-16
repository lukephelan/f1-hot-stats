import {
  fetchDriver,
  fetchDriverStats,
  fetchDriverTeams,
} from '@/app/lib/data/drivers';
import PageHeader from '@/app/ui/page-header';
import { StatCard } from '@/app/ui/stats';
import Bio from '@/app/ui/drivers/bio';
import DriverTeams from '@/app/ui/drivers/teams';

export default async function Page({ params }: { params: { id: string } }) {
  const driver = await fetchDriver(params.id);
  const stats = await fetchDriverStats(params.id);
  const driverTeams = await fetchDriverTeams(params.id);

  const title = driver.name + (driver.code ? ` (${driver.code})` : '');

  return (
    <div className='w-full'>
      <PageHeader title={title} showBackButton={true} />
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
      <DriverTeams driverTeams={driverTeams} />
    </div>
  );
}
