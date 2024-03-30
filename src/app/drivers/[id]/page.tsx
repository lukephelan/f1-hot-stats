import { Driver } from '@/app/lib/definitions';
import { fetchDriver, fetchDriverStats } from '@/app/lib/data/drivers';
import { BackButton } from '@/app/ui/buttons';
import { StatCard } from '@/app/ui/stats';
import { formatDateToLocal } from '@/app/lib/utils';

function DriveName({ driver }: { driver: Driver }) {
  if (!driver.code) {
    return <h1 className='text-2xl'>{driver.name}</h1>;
  }
  return (
    <h1 className='text-2xl'>
      {driver.name} ({driver.code})
    </h1>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const driver = await fetchDriver(params.id);
  const stats = await fetchDriverStats(params.id);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <DriveName driver={driver} />
        <BackButton />
      </div>
      <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
        <div>Nationality: {driver.nationality}</div>
        <div>
          First start: {stats.starts.firstStartName} (
          {formatDateToLocal(stats.starts.firstStartDate.toString())})
        </div>
        <div>
          Last start: {stats.starts.lastStartName} (
          {formatDateToLocal(stats.starts.lastStartDate.toString())})
        </div>
        <div>Championships: {stats.championships}</div>
      </div>
      <div className='my-4 grid grid-cols-2 gap-4'>
        <StatCard label='Number' value={driver.number} />
        <StatCard label='DOB' value={driver.dob} />
        <StatCard label='Wins' value={stats.wins} />
        <StatCard label='Career Points' value={stats.careerPoints} />
        <StatCard label='Podiums' value={stats.podiums} />
        <StatCard label='Entries' value={stats.entries} />
      </div>
    </div>
  );
}
