import {eq} from 'drizzle-orm';

import {getDB} from '@db';

import {accountAirdropTasks} from '@db/account-airdrop-tasks';
import {accountAirdrops} from '@db/account-airdrops';

const db = getDB(true);

type Props = {
  accountId: string;
  airdropId: string;
  airdropTaskId: string;
  accountAirdropId?: string;
  totalAchieved: bigint;
  interactionsCompleted: number;
  accountAirdropStatus: number;
  accountAirdropTaskStatus: number;
  validator?: string | null;
};

export const addAccountAirdropTaskSTMT = async (
  data: Props,
  createdBy: string,
) => {
  const add2DB = await db.transaction(async tx => {
    const [newAccountAirdrop] = data.accountAirdropId
      ? await tx
          .update(accountAirdrops)
          .set({
            value: data.totalAchieved,
            ic: data.interactionsCompleted,
            statusId: data.accountAirdropStatus,
            updatedBy: createdBy,
          })
          .where(eq(accountAirdrops.id, data.accountAirdropId))
          .returning({id: accountAirdrops.id})
      : await tx
          .insert(accountAirdrops)
          .values({
            accountId: data.accountId,
            airdropId: data.airdropId,
            value: data.totalAchieved,
            ic: data.interactionsCompleted,
            statusId: data.accountAirdropStatus,
            createdBy,
          })
          .returning({id: accountAirdrops.id});

    const {id: accountAirdropId} = newAccountAirdrop;

    const [newAccountAirdropTask] = await tx
      .insert(accountAirdropTasks)
      .values({
        accountAirdropId,
        airdropTaskId: data.airdropTaskId,
        validator: data.validator,
        statusId: data.accountAirdropTaskStatus,
        createdBy,
      })
      .returning({
        id: accountAirdropTasks.id,
        statusId: accountAirdropTasks.statusId,
        validator: accountAirdropTasks.validator,
      });

    const {id: accountAirdropTaskId} = newAccountAirdropTask;

    return {accountAirdropId, accountAirdropTaskId};
  });

  return add2DB;
};
