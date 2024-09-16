import type {JWT} from '@auth/core/jwt';
import type {Account, User} from 'next-auth';

type Props = {
  account: Account;
  token: JWT;
  user: User;
};

export const switchProvider = async ({account, token, user}: Props) => {
  const {provider} = account;

  switch (provider) {
    case 'credentials':
      return {
        ...token,
        ...(user?.id ? {userId: user.id} : {}),
        ...(user?.wallet ? {wallet: user.wallet} : {}),
        ...(user?.accessId ? {accessId: user.accessId} : {}),
        ...(user?.referralCode ? {referralCode: user.referralCode} : {}),
        // ...(user?.apiCookie ? {apiCookie: user.apiCookie} : {}),
      };
  }
};
