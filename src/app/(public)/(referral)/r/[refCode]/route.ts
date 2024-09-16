import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

import {getReferralCode} from '@rules/api/db/auth/get-referral-code';

type Props = {
  params: {refCode: string};
};

export async function GET(req: Req, {params}: Props) {
  const {refCode} = params;

  const r2 = req.nextUrl.searchParams.get('r2');
  const redirectTo = r2 ? `/${r2}` : '/';

  const cookieStore = cookies();
  const referredBy = cookieStore.get('onepay:ref');
  if (referredBy) return redirect(redirectTo);

  const isValid = await getReferralCode(refCode);
  if (!isValid) {
    cookieStore.delete('onepay:ref');
    return redirect(`/`);
  }

  cookieStore.set('onepay:ref', refCode, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  return redirect(redirectTo);
}
