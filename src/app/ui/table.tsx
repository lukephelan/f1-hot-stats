'use client';

import { useRouter, usePathname } from 'next/navigation';

function formatValue(value: string | number | null) {
  if (value === 0) return value;
  return value || '—';
}

export function MobileTable({
  headers,
  rows,
  rowId,
  onRowClick,
}: {
  headers: { key: string; label: string }[];
  rows: Record<string, string | number | null>[];
  rowId: string;
  onRowClick: Function;
}) {
  return (
    <div className='md:hidden'>
      {rows?.map((row) => (
        <div
          key={row[rowId]}
          className='mb-2 w-full rounded-md bg-white p-4 cursor-pointer'
          onClick={() => onRowClick(row[rowId])}
        >
          {headers.map(({ key }) => (
            <div key={key} className='border-b py-2'>
              {formatValue(row[key])}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function DesktopTable({
  headers,
  rows,
  rowId,
  onRowClick,
}: {
  headers: { key: string; label: string }[];
  rows: Record<string, string | number | null>[];
  rowId: string;
  onRowClick: Function;
}) {
  return (
    <table className='hidden min-w-full text-gray-900 md:table'>
      <thead className='rounded-lg text-left text-sm font-normal'>
        <tr>
          {headers.map(({ key, label }) => (
            <th key={key} scope='col' className='px-4 py-5 font-medium'>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-white'>
        {rows.map((row) => (
          <tr
            key={row[rowId]}
            className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg cursor-pointer'
            onClick={() => onRowClick(row[rowId])}
          >
            {headers.map(({ key }) => (
              <td key={key} className='whitespace-nowrap px-3 py-3'>
                {formatValue(row[key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Table({
  headers,
  rows,
  rowId,
  path,
}: {
  headers: { key: string; label: string }[];
  rows: Record<string, string | number | null>[];
  rowId: string;
  path?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const onRowClick = (rowId: string | number) => {
    router.push(`${path || pathname}/${rowId}`);
  };

  return (
    <>
      <MobileTable
        headers={headers}
        rows={rows}
        rowId={rowId}
        onRowClick={onRowClick}
      />
      <DesktopTable
        headers={headers}
        rows={rows}
        rowId={rowId}
        onRowClick={onRowClick}
      />
    </>
  );
}
