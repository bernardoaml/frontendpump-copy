import {Suspense} from 'react';

import {auth} from '@rules/auth';

import {LogoutContent} from './_components/content';

type Props = {
  searchParams?: {
    ask?: string;
    authError?: string;
  };
};

export default async function LogoutPage({searchParams}: Props) {
  const {ask, authError} = searchParams ?? {};
  const logoutOnMount = ask === 'no';

  const session = await auth();
  const {user} = session ?? {};

  return (
    <Suspense fallback={<p className="text-center"> -- Wait... -- </p>}>
      <LogoutContent {...{user, logoutOnMount, authError}} />
    </Suspense>
  );
}
