export const connection = 'Error while trying to connect to the server';
export const fetch = 'Request error';
export const noApiToken = 'Missing connection parameters';
export const unreported = 'Unreported error';
export const dataNotUpdated = 'Error while trying to update data';

export const wrongParams = 'Wrong parameters';

export const e404 = 'Not Found';
export const e500 = 'Internal Server Error';

export const noSession = 'Session not found';
export const resNoSession = {
  status: 401,
  errorMsg: noSession,
  errorName: 'noSession',
};

export const noPrice = 'Error on get price';
export const resNoPrice = {
  status: 400,
  errorMsg: noPrice,
};

export const noWalletConnected = 'No Wallet Connected';
export const missingParams = 'Missing parameters';
export const signInErr = 'Error on login.';

export const notFound = 'Record not found';
export const accountNotFound = 'Account not found';
export const transactionNotFound = 'Transaction not found';

export const notCreated = 'The data was not created';
export const notUpdated = 'The data was not updated';

export const validationError = 'Validation error';
