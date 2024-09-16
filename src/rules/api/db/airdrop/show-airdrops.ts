import {errorHandler as EH} from '@lib/utils/error-handler';

import {generalStatusIds} from '@constants/sys/general-status';

import {parseAirdropArr2Obj} from '@rules/airdrop/parse-airdrop-arr2obj';
import {validate} from '@rules/form-validation';
import {apiShowAirdropsSchema as schema} from '@rules/form-validation/api/airdrop/api-show-airdrop-schema';

import {showAirdropsSTMT as stmt} from './show-airdrops.stmt';

export const showAirdrops = async (statusId?: number | null) => {
  const {success, data, error} = validate({statusId}, schema);
  if (!success) return {...error};

  const placeholders = {
    statusId: (data.statusId ? [data.statusId] : generalStatusIds).join(','),
  };

  const airdropArr = await stmt.execute(placeholders).catch(EH);
  if ('errorMsg' in airdropArr) return airdropArr;

  const airdrops = parseAirdropArr2Obj(airdropArr);

  return {airdrops};
};
