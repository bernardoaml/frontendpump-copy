import {errorHandler as EH} from '@lib/utils/error-handler';

import {getReferralCodeSTMT as stmt} from './get-referral-code.stmt';

export const getReferralCode = async (referralCode: string) => {
  const dbData = await stmt.execute({referralCode}).catch(EH);
  if ('errorMsg' in dbData) return dbData;

  return dbData[0];
};
