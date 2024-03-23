import { fetchFilteredCircuits } from '@/app/lib/data';
import Table from '@/app/ui/table';

export default async function CircuitsTable({
  headers,
  query,
  currentPage,
}: {
  headers: { key: string; label: string }[];
  query: string;
  currentPage: number;
}) {
  const circuits = await fetchFilteredCircuits(query, currentPage);

  return <Table headers={headers} rows={circuits} rowId={'circuitId'} />;
}
