import {z} from 'zod';

import * as E from '@constants/data-input-errors';

export const apiGetAirdropTaskSchema = z.object({
  accountId: z.string(E.zBaseErrors).uuid('Invalid account id'),
  airdropTaskId: z.string(E.zBaseErrors).uuid('Invalid airdrop task id'),
});

export type ApiGetAirdropTaskSchema = z.infer<typeof apiGetAirdropTaskSchema>;
