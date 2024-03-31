import { sql } from '@vercel/postgres';
import { Race } from '../definitions';

const PAGE_LIMIT: number = 10;

export async function fetchFilteredRaces(query: string, currentPage: number) {
  const offset = (currentPage - 1) * PAGE_LIMIT;

  try {
    const races = await sql<Race>`
    SELECT 
      races."raceId", races.year, TO_CHAR(races.date, 'DD Month YYYY') as date, races.name, races.round,
      circuits.name as circuit
    FROM races
    JOIN circuits
    ON 
      races."circuitId" = circuits."circuitId"
    WHERE
      races.year::text ILIKE ${`%${query}%`} OR
      races.date::text ILIKE ${`%${query}%`} OR
      races.name ILIKE ${`%${query}%`} OR
      races.round::text ILIKE ${`%${query}%`} OR
      circuits.name::text ILIKE ${`%${query}%`}
    ORDER BY
      races.date DESC
    LIMIT ${PAGE_LIMIT} OFFSET ${offset}
  `;
    return races.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch races.');
  }
}

export async function fetchRacesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM races
    WHERE
      races.year::text ILIKE ${`%${query}%`} OR
      races.date::text ILIKE ${`%${query}%`} OR
      races.name ILIKE ${`%${query}%`} OR
      races.round::text ILIKE ${`%${query}%`}
  `;

    const totalCount = Number(count.rows[0].count);
    const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
    return { totalPages, totalCount };
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch total number of races.');
  }
}

export async function fetchRace(raceId: string) {
  try {
    const races = await sql<Race>`
    SELECT 
      races.year, TO_CHAR(races.date, 'DD Month YYYY') as date, races.name, races.round,
      circuits.name as circuit
    FROM races
    JOIN circuits
    ON 
      races."circuitId" = circuits."circuitId"
    WHERE races."raceId" = ${raceId}
    `;
    return races.rows[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch race.');
  }
}

export async function fetchRaceResults(raceId: string) {
  try {
    const results = await sql`
    SELECT
      results."resultId", results."raceId", results."driverId", results."constructorId", results."points",
      results.grid, results."positionOrder", results."statusId",
      CONCAT(drivers.forename, ' ', drivers.surname) AS driver,
      constructors.name as constructor, status.status as status
    FROM results
    JOIN drivers ON results."driverId" = drivers."driverId"
    JOIN constructors ON results."constructorId" = constructors."constructorId"
    JOIN status on results."statusId" = status."statusId"
    WHERE results."raceId" = ${raceId}
    ORDER BY results."positionOrder" ASC;
    `;
    return results.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch race results.');
  }
}

export async function fetchSprintResults(raceId: string) {
  try {
    const sprintResults = await sql`
    SELECT
      "sprintResults"."sprintResultId", "sprintResults"."raceId", "sprintResults"."driverId", "sprintResults"."constructorId", "sprintResults"."points",
      "sprintResults".grid, "sprintResults"."positionOrder", "sprintResults"."statusId",
      CONCAT(drivers.forename, ' ', drivers.surname) AS driver,
      constructors.name as constructor, status.status as status
    FROM "sprintResults"
    JOIN drivers ON "sprintResults"."driverId" = drivers."driverId"
    JOIN constructors ON "sprintResults"."constructorId" = constructors."constructorId"
    JOIN status on "sprintResults"."statusId" = status."statusId"
    WHERE "sprintResults"."raceId" = ${raceId}
    ORDER BY "sprintResults"."positionOrder" ASC;
    `;
    return sprintResults.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch sprint results.');
  }
}

export async function fetchQualifyingResults(raceId: string) {
  try {
    const qualifyingResults = await sql`
      SELECT
        qualifying."qualifyId", qualifying."raceId", qualifying."driverId",
        qualifying.position, qualifying.q1, qualifying.q2, qualifying.q3,
        CONCAT(drivers.forename, ' ', drivers.surname) AS driver
      FROM qualifying
      JOIN drivers ON "qualifying"."driverId" = drivers."driverId"
      WHERE qualifying."raceId" = ${raceId}
      ORDER BY qualifying.position ASC;
    `;
    return qualifyingResults.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch qualifying results.');
  }
}
