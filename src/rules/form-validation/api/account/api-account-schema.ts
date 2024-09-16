import {z} from 'zod';

import * as E from '@constants/data-input-errors';

export const apiAccoutSchema = z.object({
  wallet: z.string(E.zBaseErrors).min(1, E.required),
  signature: z.string(E.zBaseErrors).min(1, E.required),
});

export type ApiAccoutParams = z.infer<typeof apiAccoutSchema>;
