import React from 'react';

import {cn} from '@lib/utils';

import {Badge} from '@/ui/badge';

type Props = {
  className?: string;
  status?: string;
  isTask?: boolean;
};

export function AirdropStatusBadge({className, status, isTask}: Props) {
  return (
    <div className={cn('flex flex-row items-center', className)}>
      <span className="mr-3 text-sm font-light leading-4">
        Your {isTask ? 'Task' : 'Airdrop'} Status:
      </span>
      <Badge>{status ?? 'Incomplete'}</Badge>
    </div>
  );
}
