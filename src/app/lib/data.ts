import { sql } from '@vercel/postgres';
import { Driver, Constructor, Season } from './definitions';

export const PAGE_LIMIT: number = 10;

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

export async function fetchFilteredConstructors(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * PAGE_LIMIT;

  try {
    const constructors = await sql<Constructor>`
    SELECT 
      constructors."constructorId",
      constructors.name,
      constructors.nationality
    FROM constructors
    WHERE
      constructors.name::text ILIKE ${`%${query}%`} OR
      constructors.nationality::text ILIKE ${`%${query}%`}
    ORDER BY
      constructors.name ASC
    LIMIT ${PAGE_LIMIT} OFFSET ${offset}

  `;
    return constructors.rows;
  } catch (err) {
    console.log('Database Error: ', err);
    throw new Error('Failed to fetch constructors.');
  }
}

export async function fetchConstructorsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM constructors
    WHERE
      constructors.name::text ILIKE ${`%${query}%`} OR
      constructors.nationality::text ILIKE ${`%${query}%`}
  `;

    const totalCount = Number(count.rows[0].count);
    const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
    return { totalPages, totalCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of constructors.');
  }
}

export async function fetchFilteredSeasons(query: string, currentPage: number) {
  const offset = (currentPage - 1) * PAGE_LIMIT;

  try {
    const seasons = await sql<Season>`
    SELECT 
      seasons.year
    FROM seasons
    WHERE
      seasons.year::text ILIKE ${`%${query}%`}
    ORDER BY
      seasons.year DESC
    LIMIT ${PAGE_LIMIT} OFFSET ${offset}

  `;
    return seasons.rows;
  } catch (err) {
    console.log('Database Error: ', err);
    throw new Error('Failed to fetch seasons.');
  }
}

export async function fetchSeasonsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM seasons
    WHERE
      seasons.year::text ILIKE ${`%${query}%`}
  `;

    const totalCount = Number(count.rows[0].count);
    const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
    return { totalPages, totalCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of seasons.');
  }
}
