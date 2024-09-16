import {z} from 'zod';

// import {queryBoolean} from '@lib/utils/data-transform';

import * as E from '@constants/data-input-errors';

export const apiGetEventTransactionsSchema = z.object({
  wallet: z.string(E.zBaseErrors).min(1, E.required),

  signature: z.string(E.zBaseErrors).min(1, E.required),

  // full: z
  //   .string(E.zBaseErrors)
  //   .or(z.number(E.zBaseErrors))
  //   .or(z.boolean(E.zBaseErrors))
  //   .transform(queryBoolean)
  //   .nullish()
  //   .default(false),
});

export type ApiGetEventTransactionsParams = z.infer<
  typeof apiGetEventTransactionsSchema
>;
