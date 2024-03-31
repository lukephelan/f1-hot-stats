import { sql } from '@vercel/postgres';
import { Season } from '../definitions';

const PAGE_LIMIT: number = 10;

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
    console.error('Database Error: ', err);
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

export async function fetchSeason(year: string) {
  try {
    const seasons = await sql<Season>`
      SELECT *
      FROM seasons
      WHERE seasons.year = ${year}
    `;
    return seasons.rows[0];
  } catch (err) {
    console.error('Database Error: ', err);
    throw new Error('Failed to fetch season.');
  }
}

export async function fetchDriverStandings(year: string) {
  try {
    const standings = await sql`
    WITH final_round AS (
      SELECT "raceId" as final_race_id 
      FROM races 
      WHERE year = ${year}
      AND date <= '2024-03-15'
      ORDER BY round DESC
      LIMIT 1
    )
    SELECT 
      ds.position, CONCAT(d.forename, ' ', d.surname) AS driver, ds.points, d."driverId"
    FROM "driverStandings" ds
    JOIN final_round ON ds."raceId" = final_round.final_race_id
    JOIN drivers d ON ds."driverId" = d."driverId"
    ORDER BY ds.position ASC;
    `;
    return standings.rows;
  } catch (err) {
    console.error('Database Error: ', err);
    throw new Error('Failed to fetch driver standings.');
  }
}

export async function fetchConstructorStandings(year: string) {
  try {
    const standings = await sql`
    WITH final_round AS (
      SELECT "raceId" as final_race_id 
      FROM races 
      WHERE year = ${year}
      AND date <= '2024-03-15'
      ORDER BY round DESC
      LIMIT 1
    )
    SELECT 
      cs.position, c.name AS constructor, cs.points, c."constructorId"
    FROM "constructorStandings" cs
    JOIN final_round ON cs."raceId" = final_round.final_race_id
    JOIN constructors c ON cs."constructorId" = c."constructorId"
    ORDER BY cs.position ASC;
    `;
    return standings.rows;
  } catch (err) {
    console.error('Database Error: ', err);
    throw new Error('Failed to fetch constructor standings.');
  }
}

export async function fetchRaces(year: string) {
  try {
    const races = await sql`
    SELECT 
      "raceId", year, round, name, TO_CHAR(date, 'DD Month YYYY') AS date
    FROM races
    WHERE year = ${year}
    ORDER BY round asc;
    `;
    return races.rows;
  } catch (err) {
    console.error('Database Error: ', err);
    throw new Error('Failed to fetch races.');
  }
}
