function formatValue(value: string | number | null) {
  if (value === null) return '—';
  if (typeof value === 'string') return value;
  return Number(value % 1) ? value.toFixed(2) : value;
}

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className='bg-white rounded-lg text-black w-50 shadow-md'>
      <div className='p-5 flex items-center justify-between'>
        <div>
          <span className='font-semibold'>{label}</span>
        </div>
        <div>{formatValue(value)}</div>
      </div>
    </div>
  );
}
