import {connection} from '@constants/common-errors';

interface ConnectionErrorParams {
  errorMsg?: string;
  req: {method: string; url: string};
}

export class ConnectionError extends Error {
  resParams: ConnectionErrorParams;
  constructor(
    params = {},
    req: {method: FetchMethods; url: string},
    message = connection,
  ) {
    super(message);
    this.name = 'ConnectionError';
    this.resParams = {errorMsg: connection, req, ...params};
  }
}
