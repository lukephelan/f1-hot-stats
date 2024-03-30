import { sql } from '@vercel/postgres';
import { Constructor } from '../definitions';

const PAGE_LIMIT: number = 10;

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
    console.error('Database Error: ', err);
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

export async function fetchConstructor(constructorId: string) {
  try {
    const constructors = await sql<Constructor>`
      SELECT *
      FROM constructors
      WHERE constructors."constructorId" = ${constructorId}
    `;
    return constructors.rows[0];
  } catch (err) {
    console.error('Database Error: ', err);
    throw new Error('Failed to fetch constructor.');
  }
}
