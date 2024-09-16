import {relations} from 'drizzle-orm';
import {
  index,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import {sysCodes, transactions} from '@db/_schema';

export const accounts = pgTable(
  'accounts',

  {
    id: uuid('id').primaryKey().defaultRandom(),

    wallet: varchar('wallet').notNull(),

    referralCode: varchar('referral_code').notNull(),

    referredBy: uuid('referred_by'),

    accessId: smallint('access_id')
      .notNull()
      .references(() => sysCodes.code, {
        onDelete: 'no action',
        onUpdate: 'no action',
      }),

    createdAt: timestamp('created_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    updatedAt: timestamp('updated_at', {withTimezone: true, precision: 6})
      .notNull()
      .defaultNow(),

    updatedBy: uuid('updated_by'),

    deletedAt: timestamp('deleted_at', {withTimezone: true, precision: 6}),
  },

  ({wallet, referralCode, accessId}) => ({
    wallet: index().on(wallet),
    referralCode: index().on(referralCode),
    accessId: index().on(accessId),
  }),
);

export const accountsRelations = relations(
  accounts,

  ({one, many}) => ({
    access: one(sysCodes, {
      fields: [accounts.accessId],
      references: [sysCodes.code],
    }),

    txs: many(transactions),
  }),
);
