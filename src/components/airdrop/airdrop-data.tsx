import {AirdropContent} from '@/airdrop/airdrop-content';

import {getAccountAirdrop} from '@rules/api/db/account/get-account-airdrop';
import {getAirdrop} from '@rules/api/db/airdrop/get-airdrop';

type Props = {
  user: Account;
  airdropId: string;
  isOnAccountHome?: boolean;
};

export async function AirdropData({user, airdropId, isOnAccountHome}: Props) {
  const accountId = user.id;

  const [airdropData, accountAirdropData] = await Promise.all([
    getAirdrop(airdropId),
    getAccountAirdrop(accountId, airdropId),
  ]);

  if (airdropData && 'errorMsg' in airdropData)
    throw new Error(airdropData.errorMsg);

  if (accountAirdropData && 'errorMsg' in accountAirdropData)
    throw new Error(accountAirdropData.errorMsg);

  return (
    <AirdropContent {...{airdropData, accountAirdropData, isOnAccountHome}} />
  );
}
