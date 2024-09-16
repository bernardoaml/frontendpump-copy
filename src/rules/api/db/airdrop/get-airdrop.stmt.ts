import {eq, sql} from 'drizzle-orm';
import {alias} from 'drizzle-orm/pg-core';

import {getDB} from '@db';

import {airdropTasks} from '@db/airdrop-tasks';
import {airdrops} from '@db/airdrops';
import {sysCodes} from '@db/sys-codes';

const db = getDB(true);

const airdropStatus = alias(sysCodes, 'airdropStatus');
const taskStatus = alias(sysCodes, 'taskStatus');

export const getAirdropSTMT = db
  .select({
    id: airdrops.id,
    name: airdrops.name,
    description: airdrops.description,
    coinId: airdrops.coinId,
    value: airdrops.value,
    start: airdrops.start,
    end: airdrops.end,
    statusId: airdrops.statusId,
    status: airdropStatus.name,

    task: {
      id: airdropTasks.id,
      name: airdropTasks.name,
      description: airdropTasks.description,
      meta: airdropTasks.meta,
      value: airdropTasks.value,
      start: airdropTasks.start,
      end: airdropTasks.end,
      statusId: airdropTasks.statusId,
      status: taskStatus.name,
    },
  })

  .from(airdrops)

  .leftJoin(airdropTasks, eq(airdrops.id, airdropTasks.airdropId))

  .leftJoin(airdropStatus, eq(airdrops.statusId, airdropStatus.code))

  .leftJoin(taskStatus, eq(airdropTasks.statusId, taskStatus.code))

  .where(eq(airdrops.id, sql.placeholder('airdropId')))

  .prepare('get-airdrop');
