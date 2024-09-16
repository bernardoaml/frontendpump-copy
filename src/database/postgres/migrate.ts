import 'dotenv/config';

import path from 'path';

import {sql} from '@vercel/postgres';
import {drizzle as drizzleNodePG} from 'drizzle-orm/node-postgres';
import {migrate as migrateLocal} from 'drizzle-orm/node-postgres/migrator';
import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres';
import {migrate as migragteVercel} from 'drizzle-orm/vercel-postgres/migrator';
import {Client} from 'pg';

import * as schema from '@db/_schema';

const local = false;
const migrationsFolder = path.resolve(__dirname, 'drizzle');

const {PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE} = process.env;

async function main() {
  if (!local) {
    const db = drizzleVercel(sql, {schema});
    await migragteVercel(db, {migrationsFolder});
    return;
  }

  const client = new Client({
    host: PG_HOST!,
    port: Number(PG_PORT!),
    user: PG_USER!,
    password: PG_PASSWORD!,
    database: PG_DATABASE!,
  });

  await client.connect();

  const db = drizzleNodePG(client, {schema});

  await migrateLocal(db, {migrationsFolder});
}

main()
  .catch(console.error)
  .finally(() => process.exit());
