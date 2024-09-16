import {cookies} from 'next/headers';

import {errorHandler as EH} from '@lib/utils/error-handler';

import {referralCodeGen} from '@rules/api/utils/referral-code-gen';

import {addAccountSTMT as stmt} from './add-account.stmt';
import {getReferralCode} from './get-referral-code';
import {getReferralCodeSTMT} from './get-referral-code.stmt';

export const addAccount = async ({wallet}: {wallet: string}) => {
  const cookieStore = cookies();
  const refCookie = cookieStore.get('onepay:ref');

  const refTest = refCookie ? await getReferralCode(refCookie.value) : null;
  if (refTest && 'errorMsg' in refTest) return refTest;

  const referredBy = refTest?.id ?? null;

  const referralCode = referralCodeGen();

  let rcTestResult = false;
  do {
    const rcTest = await getReferralCodeSTMT.execute({referralCode}).catch(EH);
    if ('errorMsg' in rcTest) return rcTest;
    if (!rcTest?.length) rcTestResult = true;
  } while (!rcTestResult);

  const placeholders = {wallet, referralCode, referredBy, accessId: 8};

  const dbData = await stmt.execute(placeholders).catch(EH);
  if ('errorMsg' in dbData) return dbData;

  return dbData;
};
