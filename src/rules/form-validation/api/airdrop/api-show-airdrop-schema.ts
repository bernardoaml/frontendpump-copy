import {z} from 'zod';

import * as E from '@constants/data-input-errors';

export const apiShowAirdropsSchema = z.object({
  statusId: z
    .string(E.zBaseErrors)
    .or(z.number(E.zBaseErrors))
    .pipe(z.coerce.number(E.zBaseErrors).positive(E.notAllowed)),
});

export type ApiShowAirdropsSchema = z.infer<typeof apiShowAirdropsSchema>;
