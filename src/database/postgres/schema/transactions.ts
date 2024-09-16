import type {InferSelectModel} from 'drizzle-orm';

import {relations} from 'drizzle-orm';
import {
  bigint,
  index,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import {accounts, coins, sysCodes, targets} from '@db/_schema';

export const transactions = pgTable(
  'transactions',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => accounts.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    typeId: smallint('type_id')
      .notNull()
      .references(() => sysCodes.code, {
        onDelete: 'no action',
        onUpdate: 'no action',
      }),

    statusId: smallint('status_id')
      .notNull()
      .references(() => sysCodes.code, {
        onDelete: 'no action',
        onUpdate: 'no action',
      }),

    coinId: bigint('coin_id', {mode: 'number'})
      .notNull()
      .references(() => coins.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    value: bigint('value', {mode: 'bigint'}).notNull(),

    targetId: uuid('target_id').references(() => targets.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    toAccountId: uuid('to_account_id').references(() => accounts.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

    txHash: varchar('tx_hash'),

    createdAt: timestamp('created_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    createdBy: uuid('created_by').notNull(),

    updatedAt: timestamp('updated_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    updatedBy: uuid('updated_by'),
  },

  ({typeId, statusId}) => ({
    typeId: index().on(typeId),
    statusId: index().on(statusId),
  }),
);

export const transactionsRelations = relations(
  transactions,

  ({one}) => ({
    user: one(accounts, {
      fields: [transactions.id],
      references: [accounts.id],
    }),

    type: one(sysCodes, {
      fields: [transactions.typeId],
      references: [sysCodes.code],
    }),

    status: one(sysCodes, {
      fields: [transactions.statusId],
      references: [sysCodes.code],
    }),

    coinId: one(coins, {
      fields: [transactions.coinId],
      references: [coins.id],
    }),

    target: one(targets, {
      fields: [transactions.targetId],
      references: [targets.id],
    }),

    toAccount: one(accounts, {
      fields: [transactions.toAccountId],
      references: [accounts.id],
    }),
  }),
);

export type TransactionsCols = InferSelectModel<typeof transactions>;
