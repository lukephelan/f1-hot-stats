import { fetchFilteredSeasons } from '@/app/lib/data/seasons';
import Table from '@/app/ui/table';

export default async function SeasonsTable({
  headers,
  query,
  currentPage,
}: {
  headers: { key: string; label: string }[];
  query: string;
  currentPage: number;
}) {
  const seasons = await fetchFilteredSeasons(query, currentPage);

  return <Table headers={headers} rows={seasons} rowId='year' />;
}
