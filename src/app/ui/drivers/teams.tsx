import { DriverTeam } from '@/app/lib/definitions';

export default function DriverTeams({
  driverTeams,
}: {
  driverTeams: DriverTeam[];
}) {
  return (
    <div className='bg-white rounded-lg text-black w-50 shadow-md'>
      <div className='p-5'>
        <span className='font-semibold'>Teams</span>
        <ul className='pt-5'>
          {driverTeams.map((dt) => (
            <li key={dt.constructorId}>
              {dt.constructorName} ({dt.years})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
