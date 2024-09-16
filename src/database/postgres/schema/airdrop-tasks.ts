import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {
  bigint,
  index,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import {accountAirdropTasks} from './account-airdrop-tasks';
import {airdrops} from './airdrops';
import {sysCodes} from './sys-codes';

export const airdropTasks = pgTable(
  'airdrop_tasks',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    airdropId: uuid('airdrop_id')
      .notNull()
      .references(() => airdrops.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    name: varchar('name').notNull(),

    description: text('description').notNull(),

    meta: jsonb('meta').notNull().default({}).$type<Record<string, unknown>>(),

    value: bigint('value', {mode: 'bigint'}).notNull(),

    start: timestamp('start', {withTimezone: true, precision: 6}),

    end: timestamp('end', {withTimezone: true, precision: 6}),

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

  ({airdropId, name, statusId}) => ({
    airdropId: index().on(airdropId),
    name: index().on(name),
    statusId: index().on(statusId),
  }),
);

export const airdropTasksRelations = relations(
  airdropTasks,

  ({one, many}) => ({
    airdrop: one(airdrops, {
      fields: [airdropTasks.airdropId],
      references: [airdrops.id],
    }),

    status: one(sysCodes, {
      fields: [airdropTasks.statusId],
      references: [sysCodes.code],
    }),

    accounts: many(accountAirdropTasks),
  }),
);

export type DbAirdropTasks = InferSelectModel<typeof airdropTasks>;
