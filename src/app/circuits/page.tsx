import { fetchCircuitsPages } from '@/app/lib/data/circuits';
import { Suspense } from 'react';
import { TableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import CircuitsTable from '@/app/ui/circuits/table';
import Pagination from '@/app/ui/pagination';

const HEADERS = [
  {
    key: 'name',
    label: 'Circuit',
  },
  {
    key: 'location',
    label: 'Location',
  },
  {
    key: 'country',
    label: 'Country',
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

  const { totalPages, totalCount } = await fetchCircuitsPages(query);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between pb-5'>
        <h1 className='text-2xl'>Circuits</h1>
      </div>
      <div className='flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search circuits...' />
      </div>
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Suspense
              key={query + currentPage}
              fallback={<TableSkeleton headers={HEADERS} />}
            >
              <CircuitsTable
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
