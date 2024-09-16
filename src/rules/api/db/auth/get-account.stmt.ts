import {and, eq, isNull, sql} from 'drizzle-orm';

import {getDB} from '@db';

import {accounts} from '@db/accounts';

const db = getDB(true);

export const getAccountSTMT = db
  .select({
    id: accounts.id,
    wallet: accounts.wallet,
    referralCode: accounts.referralCode,
    referredBy: accounts.referredBy,
    accessId: accounts.accessId,
  })
  .from(accounts)
  .where(
    and(
      eq(accounts.wallet, sql.placeholder('wallet')),
      isNull(accounts.deletedAt),
    ),
  )
  .prepare('get-account');
