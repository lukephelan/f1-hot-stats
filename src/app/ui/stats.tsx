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
        <div>{label}</div>
        <div>{value === null ? '—' : value}</div>
      </div>
    </div>
  );
}
