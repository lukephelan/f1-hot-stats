import { fetchFilteredDrivers } from '@/app/lib/data';
import Table from '@/app/ui/table';

export default async function DriversTable({
  headers,
  query,
  currentPage,
}: {
  headers: { key: string; label: string }[];
  query: string;
  currentPage: number;
}) {
  const drivers = await fetchFilteredDrivers(query, currentPage);

  return <Table headers={headers} rows={drivers} rowId={'driverId'} />;
}
