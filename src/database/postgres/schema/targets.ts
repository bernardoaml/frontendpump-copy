import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {bigint, pgTable, smallint, timestamp, uuid} from 'drizzle-orm/pg-core';

import {tokenPriceNumber} from './_custom';
import {coins} from './coins';
import {transactions} from './transactions';

export const targets = pgTable(
  'targets',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    coinId: bigint('coin_id', {mode: 'number'})
      .notNull()
      .references(() => coins.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    step: smallint('step').notNull(),

    target: bigint('target', {mode: 'number'}).notNull(),

    achieved: bigint('achieved', {mode: 'number'}).notNull(),

    tolerance: bigint('tolerance', {mode: 'number'}).notNull(),

    value: tokenPriceNumber('value').notNull(),

    dateLimit: timestamp('date_limit', {withTimezone: true, precision: 6}),

    started: timestamp('started', {withTimezone: true, precision: 6}),

    ended: timestamp('ended', {withTimezone: true, precision: 6}),

    createdAt: timestamp('created_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    createdBy: uuid('created_by').notNull(),

    updatedAt: timestamp('updated_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    updatedBy: uuid('updated_by'),
  },
);

export const targetsRelations = relations(
  targets,

  ({one, many}) => ({
    coinId: one(coins, {
      fields: [targets.coinId],
      references: [coins.id],
    }),

    transactions: many(transactions),
  }),
);

export type DbTargets = InferSelectModel<typeof targets>;
