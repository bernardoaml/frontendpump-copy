import {and, eq, sql} from 'drizzle-orm';
import {alias} from 'drizzle-orm/pg-core';

import {getDB} from '@db';

import {accountAirdropTasks} from '@db/account-airdrop-tasks';
import {accountAirdrops} from '@db/account-airdrops';
import {airdropTasks} from '@db/airdrop-tasks';
import {airdrops} from '@db/airdrops';
import {sysCodes} from '@db/sys-codes';

const db = getDB(true);

const taskStatus = alias(sysCodes, 'taskStatus');
const accountTaskStatus = alias(sysCodes, 'accountTaskStatus');

export const getAccountTaskSTMT = db
  .select({
    id: airdropTasks.id,
    airdropId: airdropTasks.airdropId,
    name: airdropTasks.name,
    description: airdropTasks.description,
    meta: airdropTasks.meta,
    value: airdropTasks.value,
    start: airdropTasks.start,
    end: airdropTasks.end,
    statusId: airdropTasks.statusId,
    status: taskStatus.name,

    airdrop: {
      value: airdrops.value,
      start: airdrops.start,
      end: airdrops.end,
      i2c: airdrops.i2c,
      statusId: airdrops.statusId,
    },

    accountAirdrop: {
      id: accountAirdrops.id,
      airdropId: accountAirdrops.airdropId,
      accountId: accountAirdrops.accountId,
      // airdropValue: airdrops.value,
      totalAchieved: accountAirdrops.value,
      ic: accountAirdrops.ic,
      statusId: accountAirdrops.statusId,
    },

    accountTask: {
      id: accountAirdropTasks.id,
      accountAirdropId: accountAirdropTasks.accountAirdropId,
      taskId: accountAirdropTasks.airdropTaskId,
      validator: accountAirdropTasks.validator,
      statusId: accountAirdropTasks.statusId,
      status: accountTaskStatus.name,
    },
  })

  .from(airdropTasks)

  .leftJoin(airdrops, eq(airdropTasks.airdropId, airdrops.id))

  .leftJoin(taskStatus, eq(airdropTasks.statusId, taskStatus.code))

  .leftJoin(
    accountAirdropTasks,
    eq(airdropTasks.id, accountAirdropTasks.airdropTaskId),
  )

  .leftJoin(
    accountTaskStatus,
    eq(accountAirdropTasks.statusId, accountTaskStatus.code),
  )

  .leftJoin(
    accountAirdrops,
    and(
      eq(airdropTasks.airdropId, accountAirdrops.airdropId),
      eq(accountAirdrops.accountId, sql.placeholder('accountId')),
    ),
  )

  .where(eq(airdropTasks.id, sql.placeholder('airdropTaskId')))

  .prepare('get-account-task');
