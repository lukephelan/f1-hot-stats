import { TeamdDriver } from '@/app/lib/definitions';
import Table from '@/app/ui/table';
// import Pagination from '@/app/ui/pagination';

// this needs to be paginated and have suspense
// also, things seem to be bloody everywhere. need to fix that
// components should be async and load their own data so we can use suspense
// around them when

export default function ConstructorDrivers({
  constructorDrivers,
}: {
  constructorDrivers: TeamdDriver[];
}) {
  const headers = [
    {
      key: 'driverName',
      label: 'Driver',
    },
    {
      key: 'years',
      label: 'Years',
    },
  ];
  return (
    <div className='mt-2 md:mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
          <Table
            headers={headers}
            rows={constructorDrivers}
            rowId='driverId'
            path='/drivers'
          />
          {/* <Pagination totalPages={totalPages} totalCount={totalCount} /> */}
        </div>
      </div>
    </div>
  );
}
