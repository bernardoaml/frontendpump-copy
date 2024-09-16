'use server';

import {errorHandler as EH} from '@lib/utils/error-handler';

import {validate} from '@rules/form-validation';
import {apiGetAirdropTaskSchema as schema} from '@rules/form-validation/api/airdrop/api-get-airdrop-task-schema';

import {getAccountTaskSTMT as stmt} from './get-account-task.stmt';

type Props = {
  accountId: string;
  airdropTaskId: string;
};

export const getAccountTask = async ({
  accountId,
  airdropTaskId,
}: Props): Promise<
  | (AirdropTask & {
      airdrop: {
        value: bigint;
        statusId: number;
        start?: Date | null;
        end?: Date | null;
        i2c: number;
      };
      accountAirdrop: AccountAirdrop;
      accountTask: AccountAirdropTask;
    })
  | {errorMsg: string}
> => {
  const {success, data, error} = validate({accountId, airdropTaskId}, schema);
  if (!success) return {...error};

  const placeholders = {
    accountId,
    airdropTaskId: data.airdropTaskId,
  };

  const dbData = await stmt.execute(placeholders).catch(EH);

  await new Promise(resolve => setTimeout(resolve, 5000));

  if (dbData && 'errorMsg' in dbData) return dbData;

  if (!dbData.length) return {errorMsg: 'Account airdrop task not found'};

  const {airdrop, accountAirdrop, accountTask, ...rest} = dbData[0];

  return {
    ...rest,
    status: rest.status!,
    airdrop: {
      ...airdrop,
      value: airdrop!.value!,
      statusId: airdrop!.statusId!,
      start: airdrop!.start,
      end: airdrop!.end,
      i2c: airdrop!.i2c!,
    },
    accountAirdrop: {
      id: accountAirdrop!.id!,
      airdropId: accountAirdrop!.airdropId!,
      accountId: accountAirdrop!.accountId!,
      totalAchieved: accountAirdrop!.totalAchieved!,
      ic: accountAirdrop!.ic!,
      statusId: accountAirdrop!.statusId!,
      airdropValue: airdrop!.value!,
    },
    accountTask: {
      id: accountTask!.id!,
      taskId: accountTask!.taskId!,
      validator: accountTask?.validator ?? null,
      statusId: accountTask!.statusId!,
      status: accountTask!.status!,
    },
  };
};
