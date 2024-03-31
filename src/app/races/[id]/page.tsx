import { Race } from '@/app/lib/definitions';
import {
  fetchRace,
  fetchRaceResults,
  fetchSprintResults,
  fetchQualifyingResults,
} from '@/app/lib/data/races';
import { BackButton } from '@/app/ui/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import Table from '@/app/ui/table';

const HEADERS = [
  {
    key: 'positionOrder',
    label: 'Position',
  },
  {
    key: 'driver',
    label: 'Driver',
  },
  {
    key: 'constructor',
    label: 'Constructor',
  },
  {
    key: 'points',
    label: 'Points',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'grid',
    label: 'Starting Position',
  },
];

async function RaceResults({ raceId }: { raceId: string }) {
  const raceResults = await fetchRaceResults(raceId);

  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <h1 className='text-2xl p5'>Grand Prix Results</h1>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Table
              headers={HEADERS}
              rows={raceResults}
              rowId='resultId'
              enableRowNavigation={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

async function SprintResults({ raceId }: { raceId: string }) {
  const sprintResults = await fetchSprintResults(raceId);

  if (!sprintResults.length) return null;

  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <h1 className='text-2xl p5'>Sprint Results</h1>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Table
              headers={HEADERS}
              rows={sprintResults}
              rowId='sprintResultId'
              enableRowNavigation={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

async function QualifyingResults({ raceId }: { raceId: string }) {
  const QUALIFY_HEADERS = [
    {
      key: 'position',
      label: 'Position',
    },
    {
      key: 'driver',
      label: 'Driver',
    },
    {
      key: 'q1',
      label: 'Q1',
    },
    {
      key: 'q2',
      label: 'Q2',
    },
    {
      key: 'q3',
      label: 'Q3',
    },
  ];

  const qualifyingResults = await fetchQualifyingResults(raceId);

  if (!qualifyingResults.length) return null;

  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <h1 className='text-2xl p5'>Qualifying Results</h1>
      <div className='mt-2 md:mt-6 flow-root'>
        <div className='inline-block min-w-full align-middle'>
          <div className='rounded-lg bg-gray-50 text-gray-900 p-2 md:pt-0'>
            <Table
              headers={QUALIFY_HEADERS}
              rows={qualifyingResults}
              rowId='qualifyId'
              enableRowNavigation={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Bio({ race }: { race: Race }) {
  return (
    <div className='bg-white rounded-lg text-black w-50 my-4 p-5 shadow-md'>
      <div>Circuit: {race.circuit}</div>
      <div>Date: {formatDateToLocal(race.date.toString())}</div>
      <div>Round: {race.round}</div>
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const raceId = params.id;
  const race = await fetchRace(raceId);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
        <h1 className='text-2xl'>{race.name}</h1>
        <BackButton />
      </div>
      <Bio race={race} />
      <RaceResults raceId={raceId} />
      <SprintResults raceId={raceId} />
      <QualifyingResults raceId={raceId} />
    </div>
  );
}
