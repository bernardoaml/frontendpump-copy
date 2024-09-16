import {e500} from '@constants/common-errors';

const args = process.argv.slice(2);
const verbose = args.includes('--verbose');

export const errorHandler = <T extends Error>(
  error: T,
  // options = {customError: undefined, log: false},
) => {
  console.log('\n\n\n🚨 ---------- Error Handler ---------- 🚨 \n');

  console.log('Error Name :>> ', error.name);
  console.log('Error Message :>> ', error.message);
  if (verbose) console.log('\nError Stack :>> ', error.stack);

  console.log('\n🚨 ----------------------------------- 🚨\n\n');

  return {status: 500, errorMsg: e500};
};

export const e400Handler = (e: Error) => ({status: 400, errorMsg: e.message});
