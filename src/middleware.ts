import {NextResponse} from 'next/server';

import NextAuth from 'next-auth';

import {authConfig} from '@configs/auth.config';

const baseURL = process.env.BASE_URL;

export default NextAuth(authConfig).auth(req => {
  const {pathname, search} = req.nextUrl;
  const isOnDashboard = pathname.startsWith('/account');

  const isLoggedIn = !!req.auth;

  if (isOnDashboard && !isLoggedIn)
    return NextResponse.redirect(
      `${baseURL}/login?cbURL=${pathname}${search}`,
    );
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
