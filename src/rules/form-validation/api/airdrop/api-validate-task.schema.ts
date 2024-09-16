import {z} from 'zod';

import * as E from '@constants/data-input-errors';

export const apiValidateTaskSchema = z.object({
  airdropTaskId: z.string(E.zBaseErrors).trim().uuid('Invalid airdrop task id'),

  validator: z.string(E.zBaseErrors).trim().optional().nullish(),
});

export type ApiValidateTaskSchema = z.infer<typeof apiValidateTaskSchema>;
