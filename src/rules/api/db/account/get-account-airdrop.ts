'use server';

import {errorHandler as EH} from '@lib/utils/error-handler';

import {parseAccountAirdropArr2Obj} from '@rules/airdrop/parse-account-airdrop-arr2obj';

import {getAccountAirdropReducedSTMT as stmtReduced} from './get-account-airdrop-reduced.stmt';
import {getAccountAirdropSTMT as stmt} from './get-account-airdrop.stmt';

export const getAccountAirdrop = async (
  accountId: string,
  airdropId: string,
  full?: boolean,
): Promise<AccountAirdrop | {errorMsg: string}> => {
  const placeholders = {
    accountId,
    airdropId,
  };

  const dbData = await Promise.resolve(
    full ? stmt.execute(placeholders) : stmtReduced.execute(placeholders),
  ).catch(EH);

  if (dbData && 'errorMsg' in dbData) return dbData;

  const airdropObj = parseAccountAirdropArr2Obj(dbData, true);

  return airdropObj[`${accountId}:${airdropId}`] ?? null;
};
