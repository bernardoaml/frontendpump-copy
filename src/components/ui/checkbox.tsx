'use client';

import type {VariantProps} from 'class-variance-authority';

import * as React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import {CheckIcon} from '@radix-ui/react-icons';
import {cva} from 'class-variance-authority';

import {cn} from '@lib/utils';

const checkboxVariants = cva(
  'peer h-5 w-5 shrink-0 rounded-sm border border-input shadow-sm ring-offset-background data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-background',
        card: 'bg-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  asChild?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({className, variant, ...props}, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({variant, className}))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <CheckIcon className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export {Checkbox};
