import type {Metadata} from 'next';

import {baseURL} from '@lib/utils';

/* Prefix */
export const P = 'Account | OnePay';

export const accountMetadata: Metadata = {
  title: `${P}`,
  description: 'Account Page',
  bookmarks: `${baseURL}/account`,
};
