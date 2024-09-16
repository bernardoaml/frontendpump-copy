import type {SigninMessage} from '@lib/utils/signin-msg';

import {z} from 'zod';

import * as E from '@constants/data-input-errors';

export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

type NonUndefined<T> = Exclude<T, undefined>;

export type ZodInferSchema<T extends object> = {
  [Key in keyof T]-?: Equals<T[Key], NonUndefined<T[Key]>> extends false
    ?
        | z.ZodOptional<z.ZodType<NonNullable<T[Key]>>>
        | z.ZodPipeline<z.ZodOptional<z.ZodType<unknown>>, z.ZodType<T[Key]>>
    : z.ZodType<T[Key]> | z.ZodPipeline<z.ZodType<unknown>, z.ZodType<T[Key]>>;
};

type MyZodObject = ZodInferSchema<SigninMessage>;

export const accountSignInSchema = z.object({
  message: z.object<Omit<MyZodObject, 'prepare' | 'validate'>>({
    domain: z.string(),
    publicKey: z.string(),
    nonce: z.string(),
    statement: z.string(),
  }),

  signature: z.string(E.zBaseErrors).min(1, E.required),
});

export type AccountSignInParams = z.infer<typeof accountSignInSchema>;
