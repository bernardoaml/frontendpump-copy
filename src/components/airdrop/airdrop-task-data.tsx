import {getAccountAirdrop} from '@rules/api/db/account/get-account-airdrop';
import {getAirdrop} from '@rules/api/db/airdrop/get-airdrop';

import {AirdropTask} from './airdrop-task';
import {AirdropTaskModal} from './airdrop-task-modal';

type Props = {
  user: Account;
  airdropId: string;
  taskId: string;
  modal?: boolean;
};

export async function AirdropTaskData({user, airdropId, taskId, modal}: Props) {
  const accountId = user.id;

  const [airdropData, accountAirdropData] = await Promise.all([
    getAirdrop(airdropId),
    getAccountAirdrop(accountId, airdropId),
  ]);

  if (airdropData && 'errorMsg' in airdropData)
    throw new Error(airdropData.errorMsg);

  if (accountAirdropData && 'errorMsg' in accountAirdropData)
    throw new Error(accountAirdropData.errorMsg);

  const taskData = Object.getOwnPropertyNames(airdropData?.tasks ?? {}).length
    ? Object.values(airdropData?.tasks ?? []).find(task => task.id === taskId)
    : null;

  if (!taskData) throw new Error('Task not found');

  return modal ? (
    <AirdropTaskModal {...{taskData, accountAirdropData}} />
  ) : (
    <AirdropTask {...{airdropData, taskData, accountAirdropData}} />
  );
}
