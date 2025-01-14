import type {VariantProps} from 'class-variance-authority';

import * as React from 'react';

import {cva} from 'class-variance-authority';

import {cn} from '@lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-3.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-secondary text-primary-foreground shadow hover:bg-secondary/80',
        secondary:
          'border-transparent bg-secondary text-cyan-300 hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {Badge, badgeVariants};
