import type {InputProps} from '@ui/input';

import React from 'react';

import {cn} from '@lib/utils';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import {Input} from '@ui/input';

interface FormInputProps extends InputProps {
  label?: string | undefined;
  required?: boolean | undefined;
  description?: string | undefined;
  screenReaderOnly?: boolean | undefined;
  containerClassName?: string | undefined;
  labelClassName?: string | undefined;
  inputContainerClassName?: string | undefined;
  descriptionClassName?: string | undefined;
}

const FormInput = React.forwardRef<HTMLDivElement, FormInputProps>(
  (
    {
      label,
      required,
      description,
      screenReaderOnly,
      className,
      containerClassName,
      labelClassName,
      inputContainerClassName,
      descriptionClassName,
      ...props
    },
    ref,
  ) => {
    // const
    return (
      <FormItem ref={ref} className={cn(containerClassName)}>
        <FormLabel
          className={cn('flex min-h-[20px] items-end', labelClassName)}
        >
          <span>
            {label}
            {required && <sup> *</sup>}
          </span>
          <FormMessage />
        </FormLabel>

        <div className={cn(inputContainerClassName)}>
          <FormControl>
            <Input
              className={cn(
                className,
                'placeholder:text-xs placeholder:italic',
              )}
              {...props}
            />
          </FormControl>
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
FormInput.displayName = 'FormInput';

export {FormInput};
