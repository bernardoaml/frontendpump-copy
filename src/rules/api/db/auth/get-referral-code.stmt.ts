import {eq, sql} from 'drizzle-orm';

import {getDB} from '@db';

import {accounts} from '@db/accounts';
import {sysCodes} from '@db/sys-codes';

const db = getDB(true);

export const getReferralCodeSTMT = db
  .select({id: accounts.id})
  .from(accounts)
  .innerJoin(sysCodes, eq(accounts.accessId, sysCodes.code))
  .where(eq(accounts.referralCode, sql.placeholder('referralCode')))
  .prepare('get-referral-code');
