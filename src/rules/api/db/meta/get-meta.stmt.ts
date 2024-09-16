import {eq, sql} from 'drizzle-orm';

import {getDB} from '@db';

import {meta} from '@db/meta';

const db = getDB(true);

export const getMetaSTMT = db
  .select({
    id: meta.id,
    bankWallets: meta.bankWallets,
    referralCommission: meta.referralCommission,
    rewardsPerAccount: meta.rewardsPerAccount,
  })
  .from(meta)
  .where(eq(meta.id, sql.placeholder('id')))
  .prepare('get-meta');
