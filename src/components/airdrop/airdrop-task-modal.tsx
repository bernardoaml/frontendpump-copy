'use client';

import {useRouter} from 'next/navigation';

import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@ui/dialog';
import {Separator} from '@ui/separator';

import {AirdropTaskStatus} from './airdrop-task-status';

type Props = {
  taskData: AirdropTask;
  accountAirdropData: AccountAirdrop;
};

export function AirdropTaskModal({taskData, accountAirdropData}: Props) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{taskData.name}</DialogTitle>
        </DialogHeader>

        {/* <Separator className="mb-4 border border-primary" /> */}

        <p className="mt-4">{taskData.description}</p>

        <AirdropTaskStatus {...{taskData, accountAirdropData}} />
      </DialogContent>
    </Dialog>
  );
}
