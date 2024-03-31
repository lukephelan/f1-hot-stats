import { sql } from '@vercel/postgres';
import { Circuit } from '../definitions';

const PAGE_LIMIT: number = 10;

export async function fetchFilteredCircuits(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * PAGE_LIMIT;

  try {
    const circuits = await sql<Circuit>`
    SELECT 
      circuits."circuitId",
      circuits.name,
      circuits.location,
      circuits.country
    FROM circuits
    WHERE
      circuits.name ILIKE ${`%${query}%`} OR
      circuits.location ILIKE ${`%${query}%`} OR
      circuits.country ILIKE ${`%${query}%`}
    ORDER BY
      circuits.name ASC
    LIMIT ${PAGE_LIMIT} OFFSET ${offset}
  `;
    return circuits.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch circuits.');
  }
}

export async function fetchCircuitsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM circuits
    WHERE 
      circuits.name ILIKE ${`%${query}%`} OR
      circuits.location ILIKE ${`%${query}%`} OR
      circuits.country ILIKE ${`%${query}%`}
  `;

    const totalCount = Number(count.rows[0].count);
    const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
    return { totalPages, totalCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of seasons.');
  }
}

export async function fetchCircuit(circuitId: string) {
  try {
    const circuits = await sql<Circuit>`
      SELECT *
      FROM circuits
      WHERE circuits."circuitId" = ${circuitId}
    `;
    return circuits.rows[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch circuit.');
  }
}

export async function fetchRaces(circuitId: string, currentPage: number) {
  const offset = (currentPage - 1) * PAGE_LIMIT;

  try {
    const races = await sql`
    SELECT 
      "raceId", "circuitId", year, round, name, TO_CHAR(date, 'DD Month YYYY') AS date,
      date as raw_date
    FROM races
    WHERE "circuitId" = ${circuitId}
    ORDER BY raw_date DESC
    LIMIT ${PAGE_LIMIT} OFFSET ${offset};
    `;
    return races.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch races.');
  }
}

export async function fetchRacesPages(circuitId: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM races
    WHERE races."circuitId" = ${circuitId}
  `;

    const totalCount = Number(count.rows[0].count);
    const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
    return { totalPages, totalCount };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of races.');
  }
}
