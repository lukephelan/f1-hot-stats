import { Suspense } from 'react';
import { fetchDriver } from '@/app/lib/data/drivers';
import PageHeader from '@/app/ui/page-header';
import Bio from '@/app/ui/drivers/bio';
import DriverStats from '@/app/ui/drivers/stats';
import DriverTeams from '@/app/ui/drivers/teams';
import { DriverStatsSkeleton, CardSkeleton } from '@/app/ui/skeletons';

export default async function Page({ params }: { params: { id: string } }) {
  const driverId = params.id;
  const driver = await fetchDriver(driverId);

  const title = driver.name + (driver.code ? ` (${driver.code})` : '');

  return (
    <div className='w-full'>
      <PageHeader title={title} showBackButton={true} />
      <Bio driver={driver} />
      <Suspense fallback={<DriverStatsSkeleton />}>
        <DriverStats driverId={driverId} />
      </Suspense>
      <Suspense fallback={<CardSkeleton height='100px' />}>
        <DriverTeams driverId={driverId} />
      </Suspense>
    </div>
  );
}
