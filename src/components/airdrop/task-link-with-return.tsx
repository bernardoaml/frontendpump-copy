'use client';

import React, {useEffect, useMemo} from 'react';

import Link from 'next/link';

import {useFormState, useFormStatus} from 'react-dom';
import {toast} from 'sonner';

import {FaXTwitter as XIcon} from 'react-icons/fa6';

import {cn} from '@lib/utils';
import {parseLink} from '@lib/utils/parse-link';

import {Button} from '@ui/button';
import {Input} from '@ui/input';

import {validateTask} from '@rules/api/db/airdrop/validate-task';

type Props = {
  className?: string;
  taskData: AirdropTask;
  accountTask?: AccountAirdropTask;
  handleBack: (refresh?: boolean) => void;
};

const initialState = {
  message: '',
  errorData: {},
};

function SubmitButton({className}: {className?: string}) {
  const {pending} = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      disabled={pending}
      className={cn(className)}
    >
      Send
    </Button>
  );
}

export default function TaskLinkWithReturn({
  className,
  taskData,
  accountTask,
  handleBack,
}: Props) {
  const [state, formAction] = useFormState(validateTask, initialState);

  useEffect(() => {
    if (state.message && state.message !== '') toast(state.message);
    if (state.accountTask) handleBack(true);
  }, [handleBack, state]);

  const link = useMemo(() => parseLink(taskData.meta), [taskData.meta]);

  return (
    <>
      <div className="text-center">
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <Button
            className="mt-6 inline-flex items-center border-px bg-black text-white"
            variant="secondary"
            type="button"
            size="sm"
          >
            <XIcon className="h-3.5 w-3.5" />
            <span className="ml-2">{`${taskData?.meta?.linkLabel ?? 'Link'}`}</span>
          </Button>
        </Link>
      </div>

      {!accountTask && (
        <form action={formAction} className={cn(className)}>
          <input
            type="hidden"
            name="airdropTaskId"
            value={taskData.id}
            required
          />

          <div className="inline-flex w-full max-w-lg">
            <Input
              name="validator"
              className="rounded-r-none"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              placeholder={`${taskData?.meta?.linkReturn ?? ''}`}
            />
            <SubmitButton className="rounded-l-none" />
          </div>

          <p aria-live="polite" className="sr-only">
            {state?.message}
          </p>
        </form>
      )}
    </>
  );
}
