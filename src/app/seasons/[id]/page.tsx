import {
  fetchSeason,
  fetchDriverStandings,
  fetchConstructorStandings,
  fetchRaces,
} from '@/app/lib/data/seasons';
import { BackButton } from '@/app/ui/buttons';
import Table from '@/app/ui/table';

async function DriverStandings({ year }: { year: string }) {
  const HEADERS = [
    {
      key: 'position',
      label: 'Position',
    },
    {
      key: 'driver',
      label: 'Driver',
    },
    {
      key: 'points',
      label: 'Points',
    },
  ];

  const driverStandings = await fetchDriverStandings(year);

  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <h1 className='text-2xl p5'>Driver Standings</h1>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Table
              headers={HEADERS}
              rows={driverStandings}
              rowId='driverId'
              path='/drivers'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

async function ConstructorStandings({ year }: { year: string }) {
  const HEADERS = [
    {
      key: 'position',
      label: 'Position',
    },
    {
      key: 'constructor',
      label: 'Constructor',
    },
    {
      key: 'points',
      label: 'Points',
    },
  ];

  const constructorStandings = await fetchConstructorStandings(year);

  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <h1 className='text-2xl p5'>Constructor Standings</h1>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Table
              headers={HEADERS}
              rows={constructorStandings}
              rowId='constructorId'
              path='/constructors'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

async function Races({ year }: { year: string }) {
  const HEADERS = [
    {
      key: 'round',
      label: 'Round',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'date',
      label: 'Date',
    },
  ];

  const races = await fetchRaces(year);

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const year = params.id;
  const season = await fetchSeason(year);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <h1 className='text-2xl'>Season {season.year}</h1>
        <BackButton />
      </div>
      <DriverStandings year={year} />
      <ConstructorStandings year={year} />
      <Races year={year} />
    </div>
  );
}
