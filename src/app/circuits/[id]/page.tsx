import {
  fetchCircuit,
  fetchRaces,
  fetchRacesPages,
} from '@/app/lib/data/circuits';
import { BackButton } from '@/app/ui/buttons';
import Table from '@/app/ui/table';
import Pagination from '@/app/ui/pagination';
import Bio from '@/app/ui/circuits/bio';

async function Races({
  circuitId,
  searchParams,
}: {
  circuitId: string;
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const HEADERS = [
    {
      key: 'date',
      label: 'Date',
    },
    {
      key: 'name',
      label: 'Name',
    },

    {
      key: 'round',
      label: 'Round',
    },
  ];

  const currentPage = Number(searchParams?.page) || 1;
  const races = await fetchRaces(circuitId, currentPage);
  const { totalPages, totalCount } = await fetchRacesPages(circuitId);

  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <h1 className='text-2xl p5'>Races</h1>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Table
              headers={HEADERS}
              rows={races}
              rowId='raceId'
              path='/races'
            />
            <Pagination totalPages={totalPages} totalCount={totalCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  const circuitId = params.id;
  const circuit = await fetchCircuit(circuitId);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <h1 className='text-2xl'>{circuit.name}</h1>
        <BackButton href='/circuits' />
      </div>
      <Bio circuit={circuit} />
      <Races circuitId={circuitId} searchParams={searchParams} />
    </div>
  );
}
