import React, {Suspense} from 'react';

import {AirdropData} from '@/airdrop/airdrop-data';
import {ExtraBonuses} from '@/page/extra-bonuses';
import {Loading} from '@/page/loading';

import {auth} from '@rules/auth';

const {PRESALES_AIRDROP_ID} = process.env;

export default async function AirdropStarterPage() {
  const session = await auth();
  if (session === null) throw new Error('No session found');

  const {user} = session;

  const airdropId = PRESALES_AIRDROP_ID!;

  return (
    <Suspense
      fallback={
        <Loading size="sm" className="w-full py-10" iconClassName="mx-auto" />
      }
    >
      <AirdropData {...{user, airdropId}} isOnAccountHome />
      <ExtraBonuses {...{user}} />
    </Suspense>
  );
}
