'use client';

import type {CheckboxProps} from '@ui/checkbox';

import React from 'react';

// import {ControllerRenderProps, FieldPath, FieldValues} from 'react-hook-form';
import {ControllerRenderProps} from 'react-hook-form';

import {cn} from '@lib/utils';

import {Checkbox} from '@ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';

// interface FormCheckboxProps<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// > extends ControllerRenderProps<TFieldValues, TName> {
//   label?: string | undefined;
//   required?: boolean | undefined;
//   arrayItemId?: string | undefined;
//   description?: string | undefined;
//   screenReaderOnly?: boolean | undefined;
//   containerClassName?: string | undefined;
//   labelClassName?: string | undefined;
//   descriptionClassName?: string | undefined;
// }
interface FormCheckboxProps
  extends ControllerRenderProps,
    Omit<CheckboxProps, 'name' | 'value' | 'onBlur' | 'onChange'> {
  label?: string | undefined;
  required?: boolean | undefined;
  arrayItemId?: string | undefined;
  description?: string | undefined;
  screenReaderOnly?: boolean | undefined;
  containerClassName?: string | undefined;
  labelClassName?: string | undefined;
  descriptionClassName?: string | undefined;
}

const FormCheckbox = React.forwardRef<HTMLDivElement, FormCheckboxProps>(
  (
    {
      label,
      required,
      arrayItemId,
      description,
      screenReaderOnly,
      containerClassName,
      labelClassName,
      descriptionClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <FormItem ref={ref} className={cn(containerClassName)}>
        <div className="flex items-end gap-2">
          <FormControl>
            <Checkbox
              {...props}
              checked={
                arrayItemId ? props.value?.includes(arrayItemId) : props.value
              }
              onCheckedChange={checked => {
                if (!arrayItemId) return props.onChange(checked);

                return checked
                  ? props.onChange([...props.value, arrayItemId])
                  : props.onChange(
                      props.value?.filter(
                        (value: string | number) => value !== arrayItemId,
                      ),
                    );
              }}
            />
          </FormControl>

          <FormLabel
            className={cn(
              'flex cursor-pointer items-center text-sm font-medium',
              labelClassName,
            )}
          >
            <span>
              {label}
              {required && <sup> *</sup>}
            </span>
            <FormMessage />
          </FormLabel>
        </div>

        {description && (
          <div className={cn('relative', descriptionClassName)}>
            <FormDescription className={cn(screenReaderOnly ? 'sr-only' : '')}>
              {description}
            </FormDescription>
          </div>
        )}
      </FormItem>
    );
  },
);
FormCheckbox.displayName = 'FormCheckbox';

export {FormCheckbox};
