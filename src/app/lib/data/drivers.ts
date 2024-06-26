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
      TO_CHAR(drivers.dob, 'DD Month YYYY') AS dob,
      drivers.nationality
    FROM drivers
    WHERE
      drivers.forename ILIKE ${`%${query}%`} OR
      drivers.surname ILIKE ${`%${query}%`} OR
      CONCAT(drivers.forename, ' ', drivers.surname) ILIKE ${`%${query}%`} OR
      drivers.number::text ILIKE ${`%${query}%`} OR
      drivers.nationality::text ILIKE ${`%${query}%`}
    ORDER BY
      drivers.forename ASC
    LIMIT ${PAGE_LIMIT} OFFSET ${offset}
  `;
    return drivers.rows;
  } catch (err) {
    console.error('Database Error:', err);
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
      CONCAT(drivers.forename, ' ', drivers.surname) ILIKE ${`%${query}%`} OR
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
      TO_CHAR(drivers.dob, 'DD Month YYYY') AS dob,
      drivers.nationality
      FROM drivers
      WHERE drivers."driverId" = ${driverId}
    `;
    return drivers.rows[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver.');
  }
}

async function fetchWins(driverId: string) {
  try {
    const wins = await sql`
    SELECT count(*)
    FROM results
    WHERE results."driverId" = ${driverId}
    AND results.position = 1
    `;
    return Number(wins.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver wins.');
  }
}

async function fetchPodiums(driverId: string) {
  try {
    const podiums = await sql`
    SELECT count(*)
    FROM results
    WHERE results."driverId" = ${driverId}
    AND results.position in (1, 2, 3)
    `;
    return Number(podiums.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver podiums.');
  }
}

async function fetchCareerPoints(driverId: string) {
  try {
    const points = await sql`
    SELECT "driverId", SUM(points) as total_points
    FROM (
      SELECT "driverId", points FROM results WHERE "driverId" = ${driverId}
      UNION ALL
      SELECT "driverId", points from "sprintResults" WHERE "driverId" = ${driverId}
    ) as combined_results
    GROUP BY "driverId"
    `;
    return Number(points.rows[0].total_points);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver career points.');
  }
}

async function fetchEntries(driverId: string) {
  try {
    const entries = await sql`
    SELECT count(*)
    FROM results
    WHERE results."driverId" = ${driverId}
    `;
    return Number(entries.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver entries.');
  }
}

async function fetchFirstAndLastStart(driverId: string) {
  try {
    const startResults = await sql`
    WITH DriverRaces AS (
      SELECT
        MIN(races.date) as first_start,
        MAX(races.date) as last_start
      FROM
        races
      LEFT JOIN
        results on races."raceId" = results."raceId"
      WHERE
        results."driverId" = ${driverId}
    )
    SELECT
      DriverRaces.first_start AS first_race_start,
      races_first.name AS first_race_name,
      DriverRaces.last_start AS last_race_start,
      races_last.name AS last_race_name
    FROM
      DriverRaces
    JOIN
      races AS races_first ON DriverRaces.first_start = races_first.date
    JOIN
      races AS races_last ON DriverRaces.last_start = races_last.date;
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
    throw new Error('Failed to fetch driver starts.');
  }
}

async function fetchChampionships(driverId: string) {
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
        JOIN "driverStandings" ds ON ds."raceId" IN (
          SELECT
            r."raceId"
          FROM
            races r
          WHERE
            r.year = last_rounds_per_year.year AND
            r.round = last_rounds_per_year.last_round
        )
      WHERE
        ds."driverId" = ${driverId} AND
        ds.position = 1;
    `;
    const years = championships.rows.map((r) => r.championship_year).join(', ');
    const wins = championships.rows.length;
    return { wins, years };
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver champsionships.');
  }
}

async function fetchPoles(driverId: string) {
  try {
    const poles = await sql`
    SELECT count(*)
    FROM qualifying
    WHERE "driverId" = ${driverId}
    AND position = 1;
    `;
    return Number(poles.rows[0].count);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver poles.');
  }
}

export async function fetchDriverStats(driverId: string) {
  const [championships, wins, podiums, careerPoints, entries, starts, poles] =
    await Promise.all([
      fetchChampionships(driverId),
      fetchWins(driverId),
      fetchPodiums(driverId),
      fetchCareerPoints(driverId),
      fetchEntries(driverId),
      fetchFirstAndLastStart(driverId),
      fetchPoles(driverId),
    ]);
  return { championships, wins, podiums, careerPoints, entries, starts, poles };
}

export async function fetchDriverTeams(driverId: string) {
  try {
    const driverTeams = await sql`
    SELECT 
      constructors."constructorId" AS constructor_id,
      constructors.name AS constructor_name,
      STRING_AGG(DISTINCT DATE_PART('year', races.date)::text, ', ') AS years
    FROM results
    JOIN races ON results."raceId" = races."raceId"
    JOIN 
      constructors ON results."constructorId" = constructors."constructorId"
    WHERE results."driverId" = ${driverId}
    GROUP BY constructor_name, constructor_id
    ORDER BY STRING_AGG(DISTINCT DATE_PART('year', races.date)::text, ', ') DESC
    `;
    return driverTeams.rows.map((r) => {
      return {
        constructorId: r.constructor_id,
        constructorName: r.constructor_name,
        years: r.years,
      };
    });
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch driver teams.');
  }
}
