import { fetchFilteredConstructors } from '@/app/lib/data';
import Table from '@/app/ui/table';

export default async function ConstructorsTable({
  headers,
  query,
  currentPage,
}: {
  headers: { key: string; label: string }[];
  query: string;
  currentPage: number;
}) {
  const constructors = await fetchFilteredConstructors(query, currentPage);

  return (
    <Table headers={headers} rows={constructors} rowId={'constructorId'} />
  );
}
