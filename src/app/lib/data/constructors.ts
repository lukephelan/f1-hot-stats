import { sql } from '@vercel/postgres';
import { F1Constructor } from '../definitions';

const PAGE_LIMIT: number = 10;

export async function fetchFilteredConstructors(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * PAGE_LIMIT;

  try {
    const constructors = await sql<F1Constructor>`
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
    LIMIT ${PAGE_LIMIT} OFFSET ${offset};
  `;
    return constructors.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructors.');
  }
}

export async function fetchConstructorsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM constructors
    WHERE
      constructors.name::text ILIKE ${`%${query}%`} OR
      constructors.nationality::text ILIKE ${`%${query}%`};
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
    const constructors = await sql<F1Constructor>`
      SELECT *
      FROM constructors
      WHERE constructors."constructorId" = ${constructorId};
    `;
    return constructors.rows[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor.');
  }
}

async function fetchWins(constructorId: string) {
  try {
    const wins = await sql`
    SELECT count(*)
    FROM results
    WHERE results."constructorId" = ${constructorId}
    AND results.position = 1;
    `;
    return Number(wins.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor wins.');
  }
}

async function fetchPodiums(constructorId: string) {
  try {
    const podiums = await sql`
    SELECT count(*)
    FROM results
    WHERE results."constructorId" = ${constructorId}
    AND results.position in (1, 2, 3);
    `;
    return Number(podiums.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor podiums.');
  }
}

async function fetchCareerPoints(constructorId: string) {
  try {
    const points = await sql`
    SELECT "constructorId", SUM(points) as total_points
    FROM (
      SELECT "constructorId", points FROM results WHERE "constructorId" = ${constructorId}
      UNION ALL
      SELECT "constructorId", points from "sprintResults" WHERE "constructorId" = ${constructorId}
    ) as combined_results
    GROUP BY "constructorId";
    `;
    return Number(points.rows[0].total_points);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor career points.');
  }
}

async function fetchEntries(constructorId: string) {
  try {
    const entries = await sql`
    SELECT count(DISTINCT "raceId")
    FROM results
    WHERE results."constructorId" = ${constructorId};
    `;
    return Number(entries.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor entries.');
  }
}

async function fetchFirstAndLastStart(constructorId: string) {
  try {
    const startResults = await sql`
    WITH ConstructorRaces AS (
      SELECT
        MIN(races.date) as first_start,
        MAX(races.date) as last_start
      FROM
        races
      LEFT JOIN
        results on races."raceId" = results."raceId"
      WHERE
        results."constructorId" = ${constructorId}
    )
    SELECT
      ConstructorRaces.first_start AS first_race_start,
      races_first.name AS first_race_name,
      ConstructorRaces.last_start AS last_race_start,
      races_last.name AS last_race_name
    FROM
      ConstructorRaces
    JOIN
      races AS races_first ON ConstructorRaces.first_start = races_first.date
    JOIN
      races AS races_last ON ConstructorRaces.last_start = races_last.date;
    `;
    const {
      first_race_name: firstStartName,
      first_race_start: firstStartDate,
      last_race_name: lastStartName,
      last_race_start: lastStartDate,
    } = startResults.rows[0];

    return {
      firstStartName,
      firstStartDate,
      lastStartName,
      lastStartDate,
    };
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor starts.');
  }
}

async function fetchChampionships(constructorId: string) {
  try {
    const championships = await sql`
    SELECT
      last_rounds_per_year.year AS championship_year
    FROM
      (
        SELECT
          year,
          MAX(round) AS last_round
        FROM
          races
        GROUP BY
          year
        ORDER BY
          year ASC
      ) AS last_rounds_per_year
        JOIN "constructorStandings" cs ON cs."raceId" IN (
          SELECT
            r."raceId"
          FROM
            races r
          WHERE
            r.year = last_rounds_per_year.year AND
            r.round = last_rounds_per_year.last_round
        )
      WHERE
        cs."constructorId" = ${constructorId} AND
        cs.position = 1;
    `;
    const years = championships.rows.map((r) => r.championship_year).join(', ');
    const wins = championships.rows.length;
    return { wins, years };
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor champsionships.');
  }
}

async function fetchPoles(constructorId: string) {
  try {
    const poles = await sql`
    SELECT count(*)
    FROM qualifying
    WHERE "constructorId" = ${constructorId}
    AND position = 1;
    `;
    return Number(poles.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor poles.');
  }
}

export async function fetchConstructorStats(constructorId: string) {
  const [championships, wins, podiums, careerPoints, entries, starts, poles] =
    await Promise.all([
      fetchChampionships(constructorId),
      fetchWins(constructorId),
      fetchPodiums(constructorId),
      fetchCareerPoints(constructorId),
      fetchEntries(constructorId),
      fetchFirstAndLastStart(constructorId),
      fetchPoles(constructorId),
    ]);
  return { championships, wins, podiums, careerPoints, entries, starts, poles };
}

export async function fetchConstructorDrivers(constructorId: string) {
  try {
    const driverTeams = await sql`
    SELECT 
      drivers."driverId" AS driver_id,
      CONCAT(drivers.forename, ' ', drivers.surname) AS driver_name,
      STRING_AGG(DISTINCT DATE_PART('year', races.date)::text, ', ') AS years
    FROM results
    JOIN races ON results."raceId" = races."raceId"
    JOIN drivers ON results."driverId" = drivers."driverId"
    WHERE results."constructorId" = ${constructorId}
    GROUP BY driver_name, driver_id
    ORDER BY MAX(DATE_PART('year', races.date)) DESC;
    `;
    return driverTeams.rows.map((r) => {
      return {
        driverId: r.driver_id,
        driverName: r.driver_name,
        years: r.years,
      };
    });
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch constructor drivers.');
  }
}
