'use client';

import React, {useCallback} from 'react';

import {toast} from 'sonner';

// import {PiCopySimpleDuotone as CopyIcon} from 'react-icons/pi';
import { LuCopy as CopyIcon } from "react-icons/lu";

import {cn, copy2clipboard} from '@lib/utils';

import {Button} from '@/ui/button';

type Props = {
  label?: string;
  resLabel?: string;
  text: string;
  className?: string;
};

export function Text2BeCopied({resLabel, label, text, className}: Props) {
  const handleCopy = useCallback(async () => {
    await copy2clipboard(text).then(() =>
      toast.success(
        <div className="flex flex-col">
          <span>{resLabel ? `${resLabel} c` : 'C'}opied:</span>
          <span className="mt-1 font-mono text-[10px]">{text}</span>
        </div>,
      ),
    );
  }, [resLabel, text]);

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      className={cn('flex items-center gap-2 p-1', className)}
    >
      {label ?? text ?? 'Copy'}
      <CopyIcon className="text-primary" />
    </Button>
  );
}
