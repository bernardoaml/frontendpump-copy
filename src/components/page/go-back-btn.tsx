'use client';

import React, {useCallback} from 'react';

import {useRouter} from 'next/navigation';

import {cn} from '@lib/utils';

import {Button} from '@/ui/button';

export function GoBackBtn({className}: {className?: string}) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Button variant="ghost" onClick={handleBack} className={cn(className)}>
      Back
    </Button>
  );
}
