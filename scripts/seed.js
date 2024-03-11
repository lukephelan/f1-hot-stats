const { db } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function importDatabase(client) {
  try {
    const filePath = path.join(__dirname, '../f1db.sql');
    const dumpFile = fs.readFileSync(filePath, 'utf8');
    await client.query(dumpFile);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error importing database', err);
    throw err;
  }
}

async function main() {
  const client = await db.connect();
  await importDatabase(client);
  await client.end();
}

main().catch(err => {
  console.error('An error occurred while attempting to import the database:', err);
  process.exit(1);
});