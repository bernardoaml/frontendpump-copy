'use client';

import React, {useMemo} from 'react';

import Link from 'next/link';

import {Button} from '@/ui/button';

type Props = {
  airdropId: string;
  task: AirdropTask;
  accountAirdropData: AccountAirdrop | null;
  isOnAccountHome?: boolean;
};

export function AirdropTaskItem({
  airdropId,
  task,
  accountAirdropData,
  isOnAccountHome,
}: Props) {
  const accountTask = useMemo(
    () =>
      (accountAirdropData?.tasks
        ? Object.values(accountAirdropData?.tasks)
        : []
      ).find(t => t.taskId === task.id),
    [accountAirdropData?.tasks, task.id],
  );

  return (
    <div className="inline-flex w-full items-center justify-between">
      <div className="inline-flex items-center">
        <span className="mr-3 inline-block h-2.5 w-2.5 min-w-2.5 max-w-2.5 rounded-full bg-red-300" />
        <div className="text-base text-gray-300">{task.name}</div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="ml-2 h-8 w-24 min-w-24 overflow-hidden"
        asChild
      >
        <Link
          href={`/account/airdrop${isOnAccountHome ? '' : `/s/${airdropId}`}/${task.id}`}
          scroll={false}
        >
          {!accountTask ? 'Go to Task' : accountTask.status}
        </Link>
      </Button>
    </div>
  );
}
