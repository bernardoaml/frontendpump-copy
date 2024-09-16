import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {
  bigint,
  index,
  pgTable,
  smallint,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import {accountAirdropTasks} from './account-airdrop-tasks';
import {accounts} from './accounts';
import {airdrops} from './airdrops';
import {sysCodes} from './sys-codes';

export const accountAirdrops = pgTable(
  'account_airdrops',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    accountId: uuid('account_id')
      .notNull()
      .references(() => accounts.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    airdropId: uuid('airdrop_id')
      .notNull()
      .references(() => airdrops.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    value: bigint('value', {mode: 'bigint'}).notNull(),

    ic: smallint('ic').default(0), // interactions completed - clain = 1 | val = 2 | etc...

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

  ({accountId, airdropId, statusId}) => ({
    accountId: index().on(accountId),
    airdropId: index().on(airdropId),
    statusId: index().on(statusId),
  }),
);

export const accountAirdropsRelations = relations(
  accountAirdrops,

  ({one, many}) => ({
    account: one(accounts, {
      fields: [accountAirdrops.accountId],
      references: [accounts.id],
    }),

    status: one(sysCodes, {
      fields: [accountAirdrops.statusId],
      references: [sysCodes.code],
    }),

    tasks: many(accountAirdropTasks),
  }),
);

export type DbAccountAirdrop = InferSelectModel<typeof accountAirdrops>;
