import { Driver } from '@/app/lib/definitions';
import { fetchDriver, fetchDriverStats } from '@/app/lib/data/drivers';
import { BackButton } from '@/app/ui/buttons';
import { StatCard } from '@/app/ui/stats';
import { formatDateToLocal } from '@/app/lib/utils';

function DriverName({ driver }: { driver: Driver }) {
  return (
    <h1 className='text-2xl'>
      {driver.name} {driver.code && `(${driver.code})`}
    </h1>
  );
}

function DriverBio({
  driver,
  starts,
}: {
  driver: Driver;
  starts: {
    firstStartName: string;
    lastStartName: string;
    firstStartDate: Date;
    lastStartDate: Date;
  };
}) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      {driver.number && <div>Number: {driver.number}</div>}
      {driver.code && <div>Code: {driver.code}</div>}
      <div>Nationality: {driver.nationality}</div>
      <div>
        First start: {starts.firstStartName} (
        {formatDateToLocal(starts.firstStartDate.toString())})
      </div>
      <div>
        Last start: {starts.lastStartName} (
        {formatDateToLocal(starts.lastStartDate.toString())})
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const driver = await fetchDriver(params.id);
  const stats = await fetchDriverStats(params.id);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <DriverName driver={driver} />
        <BackButton />
      </div>
      <DriverBio driver={driver} starts={stats.starts} />
      <div className='my-4 grid grid-cols-2 gap-4'>
        <StatCard label='Championships' value={stats.championships.wins} />
        <StatCard label='Wins' value={stats.wins} />
        <StatCard label='Career Points' value={stats.careerPoints} />
        <StatCard label='Podiums' value={stats.podiums} />
        <StatCard label='Poles' value={stats.poles} />
        <StatCard label='Entries' value={stats.entries} />
      </div>
      <div className='text-right'>
        <small className='text-slate-500'>
          *Pole count may be incorrect due to insufficient data or penalties.
        </small>
      </div>
    </div>
  );
}
