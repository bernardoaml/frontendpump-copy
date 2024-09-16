import React from 'react';

import {cn} from '@lib/utils';

import {RefSocial} from './ref-social';
import {Text2BeCopied} from './text-2be-copied';

type Props = {
  referralCode: string;
  className?: string;
};

export function Referral({referralCode, className}: Props) {
  return (
    <div className={cn(className)}>
      <p className="mt-4 text-gray-300">
        Share your unique code with friends, and both of you can earn rewards!
        You can earn up to a 10% commission, while your friend receives a 5%
        bonus.
      </p>

      <div className="mt-6 inline-flex items-center">
        <span>Your referral code: </span>
        <Text2BeCopied
          resLabel="Referral Code"
          text={referralCode}
          className="-mt-0.5"
        />
      </div>

      <Text2BeCopied
        text={`https://onepay.cool/r/${referralCode}`}
        className="mx-auto mt-1"
      />

      <RefSocial url={`https://onepay.cool/r/${referralCode}`} />
    </div>
  );
}
