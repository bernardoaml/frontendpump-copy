import {errorHandler as EH} from '@lib/utils/error-handler';

import {getMetaSTMT as stmt} from './get-meta.stmt';

export const getMeta = async (id: string) => {
  const dbData = await stmt.execute({id}).catch(EH);
  if ('errorMsg' in dbData) return dbData;

  return dbData[0];
};
