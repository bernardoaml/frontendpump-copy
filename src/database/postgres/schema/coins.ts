import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {bigserial, pgTable, smallint, varchar} from 'drizzle-orm/pg-core';

import {airdrops} from './airdrops';
import {prices} from './prices';
import {targets} from './targets';
import {transactions} from './transactions';

export const coins = pgTable(
  'coins',

  {
    id: bigserial('id', {mode: 'number'}).primaryKey(),
    name: varchar('name').notNull(),
    symbol: varchar('symbol').notNull(),
    subunit: varchar('subunit').notNull(),
    decimals: smallint('decimals').notNull(),
    chain: varchar('chain').notNull(),
  },
);

export const coinsRelations = relations(
  coins,

  ({many}) => ({
    prices: many(prices),
    targets: many(targets),
    airdrops: many(airdrops),
    transactions: many(transactions),
  }),
);

export type DbCoins = InferSelectModel<typeof coins>;
