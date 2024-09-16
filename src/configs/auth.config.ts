import type {NextAuthConfig} from 'next-auth';

import {switchProvider} from '@rules/auth/switch-provider';

export const authConfig = {
  providers: [],

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login?authError',
  },

  cookies: {sessionToken: {options: {maxAge: 30 * 24 * 60 * 60}}},

  callbacks: {
    jwt: async ({trigger, token, account, user}) => {
      if (trigger !== 'signIn' || !account) return {...token};
      const rToken = await switchProvider({token, account, user});
      return {...token, ...rToken};
    },

    session: async ({session, token}) => {
      const user = {
        ...session.user,
        ...(token?.userId ? {id: token.userId as string} : {}),
        ...(token?.accessId ? {accessId: token.accessId as number} : {}),
        ...(token?.wallet ? {wallet: token.wallet as string} : {}),
        ...('referralCode' in token && typeof token.referralCode === 'string'
          ? {referralCode: token.referralCode as string}
          : {}),
      };

      return {...session, user};
    },

    async authorized({auth, request}) {
      const {nextUrl} = request;

      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnDashboard = nextUrl.pathname.startsWith('/account');
      const callbackURL = nextUrl.searchParams.get('cbURL');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL(callbackURL || '/account', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
