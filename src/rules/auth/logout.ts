'use server';

import {redirect} from 'next/navigation';

import {signOut} from '@rules/auth';

export async function logout(authError?: string) {
  const disconnect = await signOut({
    redirect: false,
    redirectTo: `/${
      authError ? `?${new URLSearchParams({authError}).toString()}` : ''
    }`,
  }).catch(e => {
    console.log('🪲\n ~> NEXTAUTH SIGNOUT ERROR <~ \n🪲\n', e);
  });

  const {redirect: redirectUrl} = disconnect || {};
  if (redirectUrl) redirect(redirectUrl);

  return true;
}
