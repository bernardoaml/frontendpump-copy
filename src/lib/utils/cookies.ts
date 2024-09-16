// import {cookies} from 'next/headers';

import {parse} from 'set-cookie-parser';

export function parseCookieVal(val: string) {
  const identifier = val.substring(0, 2);
  const content = val.substring(2);

  switch (identifier) {
    case 's:':
      return content;

    case 'j:':
      let jsonVal;

      try {
        jsonVal = JSON.parse(content);
      } catch (error) {
        jsonVal = undefined;
      }

      return jsonVal;

    default:
      return undefined;
  }
}

export const cookiesHandler = async (response: Response) => {
  // const cookieStore = cookies();

  const cookiesToDelete = [] as string[];

  const cookieData = (parse(response.headers.getSetCookie()) ?? []).reduce(
    (a, c) => {
      if (!c?.value || c?.value === '') {
        cookiesToDelete.push(c.name);
        return {...a};
      }

      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // /* @ts-expect-error */
      // // cookieStore.set(c);

      const parsedVal = parseCookieVal(c.value);

      return {
        ...a,
        [c.name]:
          typeof parsedVal === 'undefined' || parsedVal === null
            ? c.value
            : typeof parsedVal === 'string' || typeof parsedVal === 'number'
              ? {raw: c.value, value: parsedVal}
              : {...parsedVal},
      };
    },
    {},
  );

  return {cookieData, cookiesToDelete};
};
