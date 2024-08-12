import { fetchConstructorsPages } from '@/app/lib/data/constructors';
import { Suspense } from 'react';
import PageHeader from '@/app/ui/page-header';
import { TableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import ConstructorsTable from '@/app/ui/constructors/table';
import Pagination from '@/app/ui/pagination';
import { HEADERS } from './constants';

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
      <PageHeader title='Constructors' />
      <div className='flex items-center justify-between gap-2 mt-2 md:mt-6'>
        <Search placeholder='Search constructors...' />
      </div>
      <div className='mt-2 md:mt-6 flow-root'>
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
