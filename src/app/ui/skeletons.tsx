export function TableRowSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <tr className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
      {Array.from({ length: columnCount }, (_, i) => (
        <td className='whitespace-nowrap px-3 py-3' key={i}>
          <div className='h-5 w-32 rounded bg-gray-100'></div>
        </td>
      ))}
    </tr>
  );
}

export function MobileRowSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <div className='mb-2 w-full rounded-md bg-white p-4'>
      <div className='whitespace-nowrap px-3 py-1'>
        <div className='h-5 w-32 rounded bg-gray-100'></div>
      </div>
    </div>
  );
}

export function TableSkeleton({
  headers,
  rowCount = 10,
}: {
  headers: { key: string; label: string }[];
  rowCount?: number;
}) {
  return (
    <>
      <div className='md:hidden'>
        {Array.from({ length: rowCount }, (_, i) => (
          <MobileRowSkeleton key={i} columnCount={headers.length} />
        ))}
      </div>
      <table className='hidden min-w-full text-gray-900 md:table animate-pulse'>
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
          {Array.from({ length: rowCount }, (_, i) => (
            <TableRowSkeleton key={i} columnCount={headers.length} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export function CardSkeleton({ height }: { height: string }) {
  return (
    <div
      className='bg-white rounded-lg text-black shadow-md animate-pulse'
      style={{ height: height }}
    >
      <div className='p-5'>
        <div className='rounded bg-gray-100'></div>
      </div>
    </div>
  );
}

export function StatsSkeleton({ cardCount = 6 }: { cardCount?: number }) {
  return (
    <div className='my-4 grid grid-cols-2 gap-4'>
      {Array.from({ length: cardCount }, (_, i) => (
        <CardSkeleton key={i} height='64px' />
      ))}
    </div>
  );
}
