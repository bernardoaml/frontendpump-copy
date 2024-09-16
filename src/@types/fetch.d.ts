type FetchMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'CONNECT'
  | 'TRACE';

interface EFetchOptions {
  method?: FetchMethods;
  headers?: Record<string, string>;
  body?: Record<unknown, unknown> | FormData;
  tags?: string[];
  tag?: string;
  iTag?: string;
  secure?: boolean;
  cache?: 'no-store' | 'force-cache';
  revalidate?: number | boolean;
  isJsonRes?: boolean;
  softError?: boolean;
  baseURL?: string;
  contentType?: 'application/json';
}

interface EFetchRes<ApiReq> {
  data: ApiReq;
  user?: Account;
  errorMsg?: string;
  errorName?: string;
  cookieData?: Record<string, unknown>;
  cookiesToDelete?: string[];
}

interface EFetchErrorProps extends Error {
  message?: string;
  digest?: string;
  resParams?: Record<string, unknown>;
}

interface EFetchError extends Record<string, unknown> {
  eFetchHasError: true;
}
