import {NextResponse} from 'next/server';

// import {userAccount, userProfile} from '@configs/cookies.config';
// import {cookieName as sessionCookieName} from '@configs/session.config';

const returnMsgs = {
  200: 'Ok!',
  400: 'Erro na requisição',
  401: 'Não autorizado',
  403: 'Proibido',
  404: 'Não encontrado',
  420: 'WoW! Hold on! Four-Twenty!',
  500: 'Erro interno',
};

export class ApiRes {
  private cookies?: Cookie[];

  constructor() {}

  setCookies(cookies: Cookie[]) {
    this.cookies = cookies;
  }

  appendCookie(cookie: Cookie) {
    this.cookies = [...(this.cookies || []), cookie];
  }

  appendCookies(cookies: Cookie[]) {
    this.cookies = [...(this.cookies || []), ...cookies];
  }

  removeCookies() {
    const expires = new Date(0);
    this.cookies = [{name: 'connect', value: '', expires}];
  }

  private prepare(status: number, data?: ResData) {
    const statusText = returnMsgs[status as keyof typeof returnMsgs];

    const opts = {status, statusText};

    const res = new NextResponse(JSON.stringify(data), opts);

    (this.cookies || []).forEach(cookie => {
      res.cookies.set(cookie);
    });

    return res;
  }

  send(data?: ResData, status = 200) {
    return this.prepare(status, data);
  }

  error(
    {status, errorMsg, errorName, ...data}: ResError,
    removeCookies = false,
  ) {
    const resData = {
      errorMsg: errorMsg || 'Erro',
      errorName: errorName || undefined,
      ...data,
    };

    if (removeCookies) this.removeCookies();

    return this.prepare(status || 500, resData);
  }
}
