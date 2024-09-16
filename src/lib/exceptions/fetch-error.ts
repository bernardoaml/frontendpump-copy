import {fetch as fetchE} from '@constants/common-errors';

export class FetchError extends Error implements EFetchErrorProps {
  resParams: Record<string, unknown>;

  constructor(message = fetchE, params: Record<string, unknown> = {}) {
    super(message);
    this.name = 'FetchError';
    this.resParams = params;
  }
}
