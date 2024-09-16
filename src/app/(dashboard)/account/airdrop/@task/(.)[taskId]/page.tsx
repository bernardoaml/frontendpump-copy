import {Suspense} from 'react';

import {z} from 'zod';

import {AirdropTaskData} from '@/airdrop/airdrop-task-data';
import {Loading} from '@/page/loading';

import {auth} from '@rules/auth';

type Props = {
  params: {
    airdropId: string;
    taskId: string;
  };
};

const uuidVal = z.object({
  taskId: z.string().uuid(),
});

const {PRESALES_AIRDROP_ID} = process.env;

export default async function AirdropTaskModalPage({params}: Props) {
  const session = await auth();
  if (session === null) throw new Error('No session found');

  const {user} = session;

  const airdropId = PRESALES_AIRDROP_ID!;
  const taskId = params.taskId;

  const {success} = uuidVal.safeParse({taskId});
  if (!success) return <></>;

  return (
    <Suspense fallback={<Loading size="sm" modal />}>
      <AirdropTaskData {...{user, airdropId, taskId}} modal />
    </Suspense>
  );
}
