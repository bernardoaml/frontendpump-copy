import React, {Suspense} from 'react';

import {AirdropTaskData} from '@/airdrop/airdrop-task-data';
import {Loading} from '@/page/loading';

import {auth} from '@rules/auth';

type Props = {
  params: {
    taskId: string;
  };
};

const {PRESALES_AIRDROP_ID} = process.env;

export default async function AirdropTaskPage({params}: Props) {
  const session = await auth();
  if (session === null) throw new Error('No session found');

  const {user} = session;

  const airdropId = PRESALES_AIRDROP_ID!;
  const taskId = params.taskId;

  return (
    <Suspense
      fallback={
        <Loading size="sm" className="w-full py-10" iconClassName="mx-auto" />
      }
    >
      <AirdropTaskData {...{user, airdropId, taskId}} />
    </Suspense>
  );
}
