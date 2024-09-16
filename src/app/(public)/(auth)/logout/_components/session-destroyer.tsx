'use client';

import {useEffect} from 'react';

import {logout} from '@rules/auth/logout';

export const SessionDestroyer = ({authError}: {authError?: string}) => {
  useEffect(() => {
    const timer1 = setTimeout(() => logout(authError), 1620);
    return () => clearTimeout(timer1);
  }, [authError]);

  return (
    <div className="text-black">
      <p>{authError || 'Session Ended'}</p>
      <br />
      <p>Redirecting... Please wait...</p>
    </div>
  );
};
