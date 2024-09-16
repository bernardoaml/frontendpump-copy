import {relations} from 'drizzle-orm';
import {
  index,
  pgTable,
  smallserial,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import {
  accountAirdrops,
  accounts,
  airdrops,
  airdropTasks,
  transactions,
} from '@db/_schema';

export const sysCodes = pgTable(
  'sys_codes',
  {
    code: smallserial('code').primaryKey(),

    category: varchar('category').notNull(),

    name: varchar('name').notNull(),

    createdAt: timestamp('created_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    createdBy: uuid('created_by').notNull(),

    updatedAt: timestamp('updated_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    updatedBy: uuid('updated_by'),
  },

  table => ({
    name: index().on(table.name),
  }),
);

export const sysCodesRelations = relations(sysCodes, ({many}) => ({
  accessCodes: many(accounts),
  airdropStatus: many(airdrops),
  airdropTaskStatus: many(airdropTasks),
  accAirdropStatus: many(accountAirdrops),
  acAirdropTxStatus: many(accountAirdrops),
  txStatus: many(transactions, {relationName: 'txStatus'}),
  txTypes: many(transactions, {relationName: 'txTypes'}),
}));
