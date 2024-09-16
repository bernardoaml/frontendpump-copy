import {sql} from '@vercel/postgres';
import {drizzle as drizzleNodePG} from 'drizzle-orm/node-postgres';
import {drizzle as drizzleVercel} from 'drizzle-orm/vercel-postgres';
import {Pool} from 'pg';

import * as schema from '@db/_schema';

// const args = process.argv.slice(2);
const verbose = false;
// const verbose = true;

const {PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE} = process.env;

export const getDB = (local?: boolean) => {
  if (!local) return drizzleVercel(sql, {schema});

  const pool = new Pool({
    host: PG_HOST!,
    port: Number(PG_PORT!),
    user: PG_USER!,
    password: PG_PASSWORD!,
    database: PG_DATABASE!,
  });

  // await client.connect();

  return drizzleNodePG(pool, {schema, logger: verbose});
};
