import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {
  index,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import {accountAirdrops} from './account-airdrops';
import {airdropTasks} from './airdrop-tasks';
import {sysCodes} from './sys-codes';

export const accountAirdropTasks = pgTable(
  'account_airdrop_tasks',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    accountAirdropId: uuid('account_airdrop_id')
      .notNull()
      .references(() => accountAirdrops.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    airdropTaskId: uuid('airdrop_task_id')
      .notNull()
      .references(() => airdropTasks.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    validator: varchar('validator'),

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

  ({accountAirdropId, airdropTaskId, statusId}) => ({
    accountAirdropId: index().on(accountAirdropId),
    airdropTaskId: index().on(airdropTaskId),
    statusId: index().on(statusId),
  }),
);

export const accountAirdropTasksRelations = relations(
  accountAirdropTasks,

  ({one}) => ({
    account: one(accountAirdrops, {
      fields: [accountAirdropTasks.accountAirdropId],
      references: [accountAirdrops.id],
    }),

    task: one(airdropTasks, {
      fields: [accountAirdropTasks.airdropTaskId],
      references: [airdropTasks.id],
    }),

    status: one(sysCodes, {
      fields: [accountAirdropTasks.statusId],
      references: [sysCodes.code],
    }),
  }),
);

export type DbAccountAirdropTask = InferSelectModel<typeof accountAirdropTasks>;
