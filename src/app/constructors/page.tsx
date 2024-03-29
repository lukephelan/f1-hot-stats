import { fetchConstructorsPages } from '@/app/lib/data';
import { Suspense } from 'react';
import { TableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import ConstructorsTable from '@/app/ui/constructors/table';
import Pagination from '@/app/ui/pagination';

const HEADERS = [
  {
    key: 'name',
    label: 'Constructor',
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

  const { totalPages, totalCount } = await fetchConstructorsPages(query);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between pb-5'>
        <h1 className='text-2xl'>Constructors</h1>
      </div>
      <div className='flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search constructors...' />
      </div>
      <div className='mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Suspense
              key={query + currentPage}
              fallback={<TableSkeleton headers={HEADERS} />}
            >
              <ConstructorsTable
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
