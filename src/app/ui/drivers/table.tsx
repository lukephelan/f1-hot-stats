import { fetchFilteredDrivers } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';
import { Driver } from '@/app/lib/definitions';

export function MobileTable({ drivers }: { drivers: Driver[] }) {
  return (
    <div className="md:hidden">
      {drivers?.map((driver) => (
        <div
          key={driver.driverId}
          className="mb-2 w-full rounded-md bg-white p-4"
        >
          <div className="border-b pb-4">
            {driver.forename} {driver.surname}
          </div>
          <div className="border-b pb-4">
            {driver.number || '—'}
          </div>
          <div className="border-b pb-4">
            {driver.code || '—'}
          </div>
          <div className="border-b pb-4">
            {formatDateToLocal(driver.dob.toString())}
          </div>
          <div className="border-b pb-4">
            {driver.nationality}
          </div>
        </div>
      ))}
    </div>
  )
}

export function DesktopTable({ drivers }: { drivers: Driver[] }) {
  return (
    <table className="hidden min-w-full text-gray-900 md:table">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium">
            Driver
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Number
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Code
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            DOB
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Nationality
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {drivers?.map((driver) => (
          <tr
            key={driver.driverId}
            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
          >
            <td className="whitespace-nowrap px-3 py-3">
              {driver.forename} {driver.surname}
            </td>
            <td className="whitespace-nowrap px-3 py-3">
              {driver.number || '—'}
            </td>
            <td className="whitespace-nowrap px-3 py-3">
              {driver.code || '—'}
            </td>
            <td className="whitespace-nowrap px-3 py-3">
              {formatDateToLocal(driver.dob.toString())}
            </td>
            <td className="whitespace-nowrap px-3 py-3">
              {driver.nationality}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default async function DriversTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const drivers = await fetchFilteredDrivers(query, currentPage);

  return (
    <>
      <MobileTable drivers={drivers} />
      <DesktopTable drivers={drivers} />
    </>
  );
}