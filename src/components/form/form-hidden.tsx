'use client';

import React, {useEffect} from 'react';

import {useFormState} from 'react-hook-form';

import {cn} from '@lib/utils';

import {FormControl, FormItem, FormMessage} from '@ui/form';

interface FormHiddenProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  showError?: boolean;
  isControlled?: boolean;
  value?: string | number | readonly string[] | File | File[] | null;
  // temporaryError?: string;
}

export const FormHidden = React.forwardRef<HTMLDivElement, FormHiddenProps>(
  ({className, isControlled, showError, value, ...props}, ref) => {
    const fieldName = `${props.name}`;

    const {errors} = useFormState();

    const v = value === null ? undefined : (value as string);

    useEffect(() => {
      if (!isControlled && errors?.[fieldName])
        console.log('-> ERROR ON INPUT :>> ', fieldName, errors?.[fieldName]);
    }, [errors, fieldName, isControlled]);

    return (
      <FormItem ref={ref} className={cn(showError ? 'relative' : 'hidden')}>
        <FormMessage />

        {isControlled ? (
          <div className="hidden">
            <FormControl>
              <input {...props} type="hidden" value={v} />
            </FormControl>
          </div>
        ) : (
          <div>
            <input {...props} type="hidden" value={v} />
            {errors?.[fieldName]?.message && (
              <div className="relative">
                <span
                  className={cn(
                    'absolute top-0 inline-block text-xs',
                    className,
                  )}
                >
                  {`${errors?.[fieldName]?.message}`}
                </span>
              </div>
            )}
          </div>
        )}
      </FormItem>
    );
  },
);
FormHidden.displayName = 'FormHidden';
