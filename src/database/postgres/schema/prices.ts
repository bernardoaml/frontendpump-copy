import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {bigint, pgTable, timestamp, uuid, varchar} from 'drizzle-orm/pg-core';

import {tokenPriceNumber} from './_custom';
import {coins} from './coins';

export const prices = pgTable(
  'prices',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    coinId: bigint('coin_id', {mode: 'number'})
      .notNull()
      .references(() => coins.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    timestamp: timestamp('timestamp', {
      withTimezone: true,
      precision: 2,
    }).notNull(),

    price: tokenPriceNumber('value').notNull(),

    provider: varchar('provider').notNull(),
  },
);

export const pricesRelations = relations(
  prices,

  ({one}) => ({
    coinId: one(coins, {
      fields: [prices.coinId],
      references: [coins.id],
    }),
  }),
);

export type DbPrices = InferSelectModel<typeof prices>;
