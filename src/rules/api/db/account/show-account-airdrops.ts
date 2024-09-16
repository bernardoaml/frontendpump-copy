'use server';

import {errorHandler as EH} from '@lib/utils/error-handler';

import {parseAccountAirdropArr2Obj} from '@rules/airdrop/parse-account-airdrop-arr2obj';

import {showtAccountAirdropsSTMT as stmt} from './show-account-airdrops.stmt';

export const showAccountAirdrops = async (
  accountId: string,
): Promise<Record<string, AccountAirdrop> | {errorMsg: string}> => {
  const placeholders = {accountId};

  const airdropData = await stmt.execute(placeholders).catch(EH);
  if (airdropData && 'errorMsg' in airdropData) return airdropData;

  const airdropObj = parseAccountAirdropArr2Obj(airdropData);

  return airdropObj;
};
