import {errorHandler as EH} from '@lib/utils/error-handler';

import {addAccount} from './add-account';
import {getAccountSTMT as stmt} from './get-account.stmt';

export const getAccount = async (wallet: string) => {
  let account = await stmt.execute({wallet}).catch(EH);
  if ('errorMsg' in account) return account;

  if (!account || !account.length) {
    account = await addAccount({wallet});
    if ('errorMsg' in account) return account;
  }

  return account[0];
};
