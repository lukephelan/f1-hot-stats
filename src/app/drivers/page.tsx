import { Suspense } from 'react';
import { fetchDriversPages } from '@/app/lib/data/drivers';
import PageHeader from '@/app/ui/page-header';
import { TableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import DriversTable from '@/app/ui/drivers/table';
import Pagination from '@/app/ui/pagination';

const HEADERS = [
  {
    key: 'name',
    label: 'Driver',
  },
  {
    key: 'number',
    label: 'Number',
  },
  {
    key: 'code',
    label: 'Code',
  },
  {
    key: 'dob',
    label: 'DOB',
  },
  {
    key: 'nationality',
    label: 'Nationality',
  },
];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { totalPages, totalCount } = await fetchDriversPages(query);

  return (
    <div className='w-full'>
      <PageHeader title='Drivers' />
      <div className='flex items-center justify-between gap-2 mt-2 md:mt-6'>
        <Search placeholder='Search drivers...' />
      </div>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Suspense
              key={query + currentPage}
              fallback={<TableSkeleton headers={HEADERS} />}
            >
              <DriversTable
                headers={HEADERS}
                query={query}
                currentPage={currentPage}
              />
            </Suspense>
            <Pagination totalPages={totalPages} totalCount={totalCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
