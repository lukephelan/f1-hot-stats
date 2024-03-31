import { fetchFilteredRaces } from '@/app/lib/data/races';
import Table from '@/app/ui/table';

export default async function SprintsTable({
  headers,
  query,
  currentPage,
}: {
  headers: { key: string; label: string }[];
  query: string;
  currentPage: number;
}) {
  const races = await fetchFilteredRaces(query, currentPage);

  return <Table headers={headers} rows={races} rowId='raceId' />;
}
