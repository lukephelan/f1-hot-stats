import { sql } from '@vercel/postgres';
import { Driver } from '../definitions';

const PAGE_LIMIT: number = 10;

export async function fetchFilteredDrivers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * PAGE_LIMIT;

  try {
    const drivers = await sql<Driver>`
    SELECT 
      drivers."driverId",
      CONCAT(drivers.forename, ' ', drivers.surname) AS name,
      drivers.number,
      drivers.code,
      TO_CHAR(drivers.dob, 'D Month YYYY') AS dob,
      drivers.nationality
    FROM drivers
    WHERE
      drivers.forename ILIKE ${`%${query}%`} OR
      drivers.surname ILIKE ${`%${query}%`} OR
      drivers.number::text ILIKE ${`%${query}%`} OR
      drivers.nationality::text ILIKE ${`%${query}%`}
    ORDER BY
      drivers.forename ASC
    LIMIT ${PAGE_LIMIT} OFFSET ${offset}
  `;
    return drivers.rows;
  } catch (err) {
    console.log('Database Error: ', err);
    throw new Error('Failed to fetch drivers.');
  }
}

export async function fetchDriversPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM drivers
    WHERE
      drivers.forename ILIKE ${`%${query}%`} OR
      drivers.surname ILIKE ${`%${query}%`} OR
      drivers.number::text ILIKE ${`%${query}%`} OR
      drivers.nationality::text ILIKE ${`%${query}%`}
  `;

    const totalCount = Number(count.rows[0].count);
    const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
    return { totalPages, totalCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of drivers.');
  }
}

export async function fetchDriver(driverId: string) {
  try {
    const drivers = await sql<Driver>`
    SELECT 
      drivers."driverId",
      CONCAT(drivers.forename, ' ', drivers.surname) AS name,
      drivers.number,
      drivers.code,
      TO_CHAR(drivers.dob, 'D Month YYYY') AS dob,
      drivers.nationality
      FROM drivers
      WHERE drivers."driverId" = ${driverId}
    `;
    return drivers.rows[0];
  } catch (err) {
    console.log('Database Error: ', err);
    throw new Error('Failed to fetch driver.');
  }
}
