'use client';

import React, {useCallback, useMemo} from 'react';

import {useRouter} from 'next/navigation';

import {AirdropStatusBadge} from './airdrop-status-badge';
import {TaskClainBtn} from './task-clain.btn';
import TaskLinkWithReturn from './task-link-with-return';

type Props = {
  taskData: AirdropTask;
  accountAirdropData: AccountAirdrop;
};

export function AirdropTaskStatus({taskData, accountAirdropData}: Props) {
  const router = useRouter();

  const type = useMemo(
    () => taskData?.meta?.type ?? 'clainBtn',
    [taskData?.meta?.type],
  );

  const accountTask = useMemo(
    () => accountAirdropData?.tasks?.[taskData.id],
    [accountAirdropData?.tasks, taskData.id],
  );

  const handleBack = useCallback(
    (refresh?: boolean) => {
      router.back();
      if (refresh) setTimeout(() => router.refresh(), 50);
    },
    [router],
  );

  return (
    <>
      {type === 'clainBtn' && (
        <TaskClainBtn
          className="mt-8 text-center"
          {...{taskData, accountTask, handleBack}}
        />
      )}

      {type === 'linkWithValidator' && (
        <TaskLinkWithReturn
          className="mb-4 mt-8 text-center"
          {...{taskData, accountTask, handleBack}}
        />
      )}

      <AirdropStatusBadge
        className="mx-auto mt-8"
        status={accountTask?.status ?? 'Incomplete'}
        isTask
      />
    </>
  );
}
