import Link from 'next/link';

import {RiLogoutCircleLine as DisconnectIcon} from 'react-icons/ri';

import {Button} from '@ui/button';

import {logout} from '@rules/auth/logout';

import {SessionDestroyer} from './session-destroyer';

export async function LogoutContent({
  user,
  logoutOnMount,
  authError,
}: {
  user: Account | undefined;
  logoutOnMount: boolean;
  authError?: string;
}) {
  return (
    <div className="sm:text-center">
      <h2 className="text-xl font-medium tracking-tight text-primary sm:text-2xl">
        {logoutOnMount || !user ? (
          <span>Logged Out</span>
        ) : (
          <span>Do you want to log out?</span>
        )}
      </h2>

      <div className="flex flex-row justify-end pt-6 sm:justify-evenly sm:pt-10">
        {logoutOnMount ? (
          <SessionDestroyer {...{authError}} />
        ) : user ? (
          <form
            action={async () => {
              'use server';
              await logout();
            }}
          >
            <Button variant="secondary">
              <DisconnectIcon className="mr-2 h-5 w-5" />
              <span>Logout!</span>
            </Button>
          </form>
        ) : (
          <Link href="/login">
            <Button className="w-40" variant="secondary" type="button">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
