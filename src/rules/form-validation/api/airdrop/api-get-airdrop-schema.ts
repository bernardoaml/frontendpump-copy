import {z} from 'zod';

import * as E from '@constants/data-input-errors';

export const apiGetAirdropSchema = z.object({
  airdropId: z.string(E.zBaseErrors).uuid('Invalid airdrop id'),
});

export type ApiGetAirdropSchema = z.infer<typeof apiGetAirdropSchema>;
