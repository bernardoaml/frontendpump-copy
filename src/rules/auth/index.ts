import {cookies} from 'next/headers';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import {authConfig} from '@configs/auth.config';

import {SigninMessage} from '@lib/utils/signin-msg';

import {getAccount} from '@rules/api/db/auth/get-account';

const {AUTH_URL} = process.env;

export const {handlers, auth, signIn, signOut} = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      name: 'Solana',

      credentials: {
        message: {
          label: 'Message',
          type: 'text',
        },

        signature: {
          label: 'Signature',
          type: 'text',
        },
      },

      async authorize(credentials) {
        try {
          const signinMessage = new SigninMessage(
            JSON.parse(String(credentials?.message) || '{}'),
          );

          const nextAuthUrl = new URL(AUTH_URL!);
          if (signinMessage.domain !== nextAuthUrl.host) return null;

          const cookieVals = cookies()
            .getAll()
            .find(item => item.name.includes('authjs.csrf-token'));

          const csrfToken = decodeURI(cookieVals?.value || '').split('|')[0];
          if (signinMessage.nonce !== csrfToken) return null;

          const validationResult = await signinMessage.validate(
            String(credentials?.signature || ''),
          );

          if (!validationResult)
            throw new Error('Could not validate the signed message');

          const wallet = await getAccount(signinMessage.publicKey);
          if (wallet && 'errorMsg' in wallet) throw new Error(wallet.errorMsg);

          return wallet;
        } catch (e) {
          return null;
        }
      },
    }),
  ],

  // debug: true,
});
