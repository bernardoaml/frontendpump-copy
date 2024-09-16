import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {
  bigint,
  index,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import {airdropTasks} from './airdrop-tasks';
import {coins} from './coins';
import {sysCodes} from './sys-codes';

export const airdrops = pgTable(
  'airdrops',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    name: varchar('name').notNull(),

    description: text('description').notNull(),

    coinId: bigint('coin_id', {mode: 'number'})
      .notNull()
      .references(() => coins.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    value: bigint('value', {mode: 'bigint'}).notNull(),

    start: timestamp('start', {withTimezone: true, precision: 6}),

    end: timestamp('end', {withTimezone: true, precision: 6}),

    i2c: smallint('i2c').default(0), // interactions to complete - clain = 1 | val = 2 | etc...

    statusId: smallint('status_id')
      .notNull()
      .references(() => sysCodes.code, {
        onDelete: 'no action',
        onUpdate: 'no action',
      }),

    createdAt: timestamp('created_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    createdBy: uuid('created_by').notNull(),

    updatedAt: timestamp('updated_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    updatedBy: uuid('updated_by'),
  },

  ({name, coinId, statusId}) => ({
    name: index().on(name),
    coinId: index().on(coinId),
    statusId: index().on(statusId),
  }),
);

export const airdropsRelations = relations(
  airdrops,

  ({one, many}) => ({
    coin: one(coins, {
      fields: [airdrops.coinId],
      references: [coins.id],
    }),

    status: one(sysCodes, {
      fields: [airdrops.statusId],
      references: [sysCodes.code],
    }),

    tasks: many(airdropTasks),
  }),
);

export type DbAirdrop = InferSelectModel<typeof airdrops>;
