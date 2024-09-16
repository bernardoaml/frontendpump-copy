import {and, eq, sql} from 'drizzle-orm';
import {alias} from 'drizzle-orm/pg-core';

import {getDB} from '@db';

import {accountAirdropTasks} from '@db/account-airdrop-tasks';
import {accountAirdrops} from '@db/account-airdrops';
import {sysCodes} from '@db/sys-codes';

const db = getDB(true);

const accountAirdropStatus = alias(sysCodes, 'accountAirdropStatus');
const accountAirdropTaskStatus = alias(sysCodes, 'accountAirdropTaskStatus');

export const getAccountAirdropReducedSTMT = db
  .select({
    id: accountAirdrops.id,
    accountId: accountAirdrops.accountId,
    airdropId: accountAirdrops.airdropId,
    totalAchieved: accountAirdrops.value,
    statusId: accountAirdrops.statusId,
    status: accountAirdropStatus.name,

    task: {
      id: accountAirdropTasks.id,
      taskId: accountAirdropTasks.airdropTaskId,
      validator: accountAirdropTasks.validator,
      statusId: accountAirdropTasks.statusId,
      status: accountAirdropTaskStatus.name,
    },
  })

  .from(accountAirdrops)

  .leftJoin(
    accountAirdropTasks,
    eq(accountAirdrops.id, accountAirdropTasks.accountAirdropId),
  )

  .leftJoin(
    accountAirdropStatus,
    eq(accountAirdrops.statusId, accountAirdropStatus.code),
  )

  .leftJoin(
    accountAirdropTaskStatus,
    eq(accountAirdropTasks.statusId, accountAirdropTaskStatus.code),
  )

  .where(
    and(
      eq(accountAirdrops.accountId, sql.placeholder('accountId')),
      eq(accountAirdrops.airdropId, sql.placeholder('airdropId')),
    ),
  )

  .prepare('get-account-airdrop');
