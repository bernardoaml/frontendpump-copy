import {sql} from 'drizzle-orm';

import {getDB} from '@db';

import {accounts} from '@db/accounts';

const db = getDB(true);

export const addAccountSTMT = db
  .insert(accounts)
  .values({
    wallet: sql.placeholder('wallet'),
    referralCode: sql.placeholder('referralCode'),
    referredBy: sql.placeholder('referredBy'),
    accessId: sql.placeholder('accessId'),
  })
  .returning({
    id: accounts.id,
    wallet: accounts.wallet,
    referralCode: accounts.referralCode,
    referredBy: accounts.referredBy,
    accessId: accounts.accessId,
  })
  .prepare('add-account');
