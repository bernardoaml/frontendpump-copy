import {and, eq, sql} from 'drizzle-orm';
import {alias} from 'drizzle-orm/pg-core';

import {getDB} from '@db';

import {accountAirdropTasks} from '@db/account-airdrop-tasks';
import {accountAirdrops} from '@db/account-airdrops';
import {airdropTasks} from '@db/airdrop-tasks';
import {airdrops} from '@db/airdrops';
import {sysCodes} from '@db/sys-codes';

const db = getDB(true);

const accountAirdropStatus = alias(sysCodes, 'accountAirdropStatus');
const accountAirdropTaskStatus = alias(sysCodes, 'accountAirdropTaskStatus');

export const getAccountAirdropSTMT = db
  .select({
    id: accountAirdrops.id,
    accountId: accountAirdrops.accountId,
    airdropId: accountAirdrops.airdropId,
    airdropName: airdrops.name,
    airdropValue: airdrops.value,
    totalAchieved: accountAirdrops.value,
    statusId: accountAirdrops.statusId,
    status: accountAirdropStatus.name,

    task: {
      id: accountAirdropTasks.id,
      taskId: accountAirdropTasks.airdropTaskId,
      taskName: airdropTasks.name,
      taskValue: airdropTasks.value,
      validator: accountAirdropTasks.validator,
      statusId: accountAirdropTasks.statusId,
      status: accountAirdropTaskStatus.name,
    },
  })

  .from(accountAirdrops)

  .leftJoin(airdrops, eq(accountAirdrops.airdropId, airdrops.id))

  .leftJoin(
    accountAirdropTasks,
    eq(accountAirdrops.id, accountAirdropTasks.accountAirdropId),
  )

  .leftJoin(
    airdropTasks,
    eq(accountAirdropTasks.airdropTaskId, airdropTasks.id),
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
