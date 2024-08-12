import { fetchRacesPages } from '@/app/lib/data/races';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import { TableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import RacesTable from '@/app/ui/races/table';
import Pagination from '@/app/ui/pagination';

export const HEADERS = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'circuit',
    label: 'Circuit',
  },
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'round',
    label: 'Round',
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

  const { totalPages, totalCount } = await fetchRacesPages(query);

  return (
    <div className='w-full'>
      <PageHeader title='Races' />
      <div className='flex items-center justify-between gap-2 mt-2 md:mt-6'>
        <Search placeholder='Search races...' />
      </div>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Suspense
              key={query + currentPage}
              fallback={<TableSkeleton headers={HEADERS} />}
            >
              <RacesTable
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
