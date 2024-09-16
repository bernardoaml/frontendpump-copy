'use client';

import React, {useEffect} from 'react';

import {useFormState, useFormStatus} from 'react-dom';
import {toast} from 'sonner';

import {cn} from '@lib/utils';

import {Button} from '@ui/button';

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
      {pending ? 'wait' : 'Clain'}
    </Button>
  );
}

export function TaskClainBtn({
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

  return (
    !accountTask && (
      <form action={formAction} className={cn(className)}>
        <input
          type="hidden"
          name="airdropTaskId"
          value={taskData.id}
          required
        />

        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>

        <SubmitButton className="w-32" />
      </form>
    )
  );
}
