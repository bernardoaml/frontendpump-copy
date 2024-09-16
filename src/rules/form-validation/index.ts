import type {RefinementCtx, ZodEffects, ZodObject, ZodRawShape} from 'zod';

import {createHash} from 'crypto';

import {ZodError} from 'zod';

import {e500, validationError} from '@constants/common-errors';
import {noEmpty} from '@constants/data-input-errors';

const prefix = process.env.APP_PREFIX;
const env = process.env.NODE_ENV;
const isDev = env === 'development';

type ValidationResult<T> =
  | {
      success: false;
      data?: T | Record<string, unknown>;
      resCode: number;
      error: {errorMsg: string; data?: unknown};
    }
  | {
      success: true;
      data: T;
      resCode?: null;
      error?: null;
    };

export function isFile(
  val: unknown,
  nullable?: boolean,
  allowString?: boolean,
) {
  return nullable &&
    (val === null ||
      val === undefined ||
      (val instanceof FileList && val.length === 0))
    ? true
    : (typeof val === 'string' && allowString) ||
        val instanceof File ||
        (val instanceof FileList && val.length > 0);
}

export function isPng(val: unknown, nullable: boolean) {
  return nullable &&
    (val === null ||
      val === undefined ||
      (val instanceof FileList && val.length === 0))
    ? true
    : (val instanceof File && ['image/png'].includes(val.type)) ||
        (val instanceof FileList && val.length > 0); // falta testar array
}

export const emptyNullableStr2Null = (v?: number | string | null) =>
  v === undefined || v === null || `${v}`.trim() === '' ? null : `${v}`.trim();

export const val2Number = (
  val: string | number,
  _zodContext?: unknown,
  locale?: string,
) => {
  const defaultLocale = locale || 'pt-BR';
  const {format} = new Intl.NumberFormat(defaultLocale);
  const [, decimalSign] = /^0(.)1$/.exec(format(0.1)) || [];
  return +`${val}`
    .replace(new RegExp(`[^${decimalSign}\\d]`, 'g'), '')
    .replace(decimalSign, '.');
};

export const validate = <
  T extends ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>,
>(
  data: Record<string, unknown>,
  schema: T,
): ValidationResult<T['_output']> => {
  try {
    const parsedData = schema.parse(data);

    return {success: true, data: parsedData};
  } catch (err) {
    if (err instanceof ZodError) {
      const {issues} = err;

      const errors = issues.reduce(
        (a, i) => ({...a, [i.path.join('.')]: i.message}),
        {},
      );

      if (isDev) {
        //   console.log('🪲\n ~ Form Validation Error -> ', err);
        console.log('🪲\n ~ Form Validation errors -> ', errors);
      }

      const error = {errorMsg: validationError, errorData: {errors}};

      return {success: false, resCode: 400, error};
    }

    return {success: false, resCode: 500, error: {errorMsg: e500}};
  }
};

export const validadeEmail = (value: string) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{1,10}$/i.test(`${value || ''}`);

export const validadeDdiPhone = (value: string) =>
  /^\+\d{1,4}\(\d{1,16}\)[\d-]{0,16}$/.test(`${value || ''}`);

export const isBlankHashedPswd = (value: string) =>
  value === createHash('sha512').update(`${prefix}:`).digest('hex');

export const refineBlankedPswd = (value: string, ctx: RefinementCtx) =>
  isBlankHashedPswd(value)
    ? ctx.addIssue({code: 'custom', message: noEmpty})
    : true;
