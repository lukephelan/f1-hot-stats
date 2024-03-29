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

export async function fetchSeason(seasonId: string) {
  try {
    const seasons = await sql<Season>`
      SELECT *
      FROM seasons
      WHERE seasons.year = ${seasonId}
    `;
    return seasons.rows[0];
  } catch (err) {
    console.log('Database Error: ', err);
    throw new Error('Failed to fetch season.');
  }
}
