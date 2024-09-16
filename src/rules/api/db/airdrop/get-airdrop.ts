'use server';

import {errorHandler as EH} from '@lib/utils/error-handler';

import {parseAirdropArr2Obj} from '@rules/airdrop/parse-airdrop-arr2obj';
import {validate} from '@rules/form-validation';
import {apiGetAirdropSchema as schema} from '@rules/form-validation/api/airdrop/api-get-airdrop-schema';

import {getAirdropSTMT} from './get-airdrop.stmt';

export const getAirdrop = async (
  airdropId: string,
): Promise<Airdrop | {errorMsg: string}> => {
  const {success, data, error} = validate({airdropId}, schema);
  if (!success) return {...error};

  const placeholders = {
    airdropId: data.airdropId,
  };

  const airdropData = await getAirdropSTMT.execute(placeholders).catch(EH);
  if (airdropData && 'errorMsg' in airdropData) return airdropData;

  const airdropObj = parseAirdropArr2Obj(airdropData);

  return airdropObj[airdropId] ?? {errorMsg: 'Airdrop not found'};
};
