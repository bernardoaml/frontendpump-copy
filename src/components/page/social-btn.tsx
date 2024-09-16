import React from 'react';

import Link from 'next/link';

import {FaXTwitter as XIcon} from 'react-icons/fa6';

import {Button} from '@ui/button';

export function SocialBtn() {
  return (
    <Button className="h-10 w-10 rounded-2xl p-0" variant="outline">
      <Link href="https://x.com/onepaysolana" target="_blank">
        <XIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
}
