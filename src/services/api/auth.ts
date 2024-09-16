'use server';

import {signIn} from '@rules/auth';

const authErrors: {[key: string]: string} = {
  CredentialsSignin: 'Credenciais inválidas',
  AccessDenied: 'Acesso negado',
  CallbackRouteError: 'Erro ao logar',
};

export async function authCredentials(data: {
  message: string;
  signature: string;
  referral?: string;
}): Promise<undefined | {errorMsg: string}> {
  const connect = await signIn('credentials', {...data, redirect: false}).catch(
    error => {
      const {message} = error as Error & {digest?: string};
      if (Object.keys(authErrors).includes(message))
        return {errorMsg: authErrors[message]};
      throw error;
    },
  );

  return connect;
}
