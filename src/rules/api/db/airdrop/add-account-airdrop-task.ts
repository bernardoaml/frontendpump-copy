import {errorHandler as EH} from '@lib/utils/error-handler';

import {addAccountAirdropTaskSTMT as stmt} from './add-account-airdrop-task.stmt';

type Props = {
  accountId: string;
  accountTaskData: AirdropTask & {
    airdrop: {
      value: bigint;
      statusId: number;
      start?: Date | null;
      end?: Date | null;
      i2c: number;
    };
    accountAirdrop: AccountAirdrop;
    accountTask: AccountAirdropTask;
  };
  validator?: string | null;
};

export const addAccountAirdropTask = async (
  {accountId, accountTaskData, validator}: Props,
  createdBy: string,
) => {
  const {airdrop, meta, start, end, value: v} = accountTaskData;

  const validatorRequired = meta?.type === 'linkWithValidator';

  if (validatorRequired && (!validator || validator === ''))
    return {errorMsg: `This task has a requirement: ${meta.linkReturn}`};

  const now = new Date();

  if (airdrop.start && airdrop.start > now)
    return {errorMsg: 'Airdrop not started yet'};

  if (airdrop.end && airdrop.end < now) return {errorMsg: 'Airdrop ended'};

  if (start && start > now) return {errorMsg: 'Task not started yet'};
  if (end && end < now) return {errorMsg: 'Task ended'};

  const newAchieved = validatorRequired ? 0n : v ?? 0n;
  const totalAchieved = accountTaskData?.accountAirdrop?.totalAchieved
    ? accountTaskData.accountAirdrop.totalAchieved + newAchieved
    : newAchieved;

  const ic = accountTaskData?.accountAirdrop?.ic
    ? accountTaskData.accountAirdrop.ic + 1
    : 1;

  const hasBeenCompleted = ic >= airdrop.i2c;

  const accountAirdropStatus =
    validatorRequired || (!validatorRequired && !hasBeenCompleted) ? 37 : 31;

  const placeholders = {
    accountId,
    airdropId: accountTaskData.airdropId,
    airdropTaskId: accountTaskData.id,
    accountAirdropId: accountTaskData?.accountAirdrop?.id ?? null,
    totalAchieved,
    interactionsCompleted: ic,
    accountAirdropStatus,
    accountAirdropTaskStatus: validatorRequired ? 34 : 31,
    validator,
  };

  const dbData = await stmt(placeholders, createdBy).catch(EH);
  if ('errorMsg' in dbData) return dbData;

  return dbData;
};
