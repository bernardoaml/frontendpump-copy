import 'dotenv/config';

import type {Config} from 'drizzle-kit';

const {PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE} = process.env;

export default {
  schema: 'src/database/postgres/schema',
  out: 'src/database/postgres/drizzle',

  driver: 'pg',

  dbCredentials: {
    host: PG_HOST!,
    port: Number(PG_PORT!),
    user: PG_USER!,
    password: PG_PASSWORD!,
    database: PG_DATABASE!,
    // ssl: true,
  },

  strict: true,
  verbose: true,
} satisfies Config;
