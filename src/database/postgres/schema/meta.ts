import type {InferSelectModel} from 'drizzle-orm';

import {
  bigint,
  jsonb,
  pgTable,
  smallint,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const meta = pgTable(
  'meta',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    bankWallets: jsonb('bank_wallets')
      .notNull()
      .default({})
      .$type<Record<string, string[]>>(),

    referralCommission: bigint('referral_commission', {
      mode: 'bigint',
    }).notNull(),

    rewardsPerAccount: smallint('comission_per_account'),

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

export type DbMeta = InferSelectModel<typeof meta>;
