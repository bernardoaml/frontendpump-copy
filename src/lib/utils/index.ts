import {cn} from '@lib/utils/cn';
import {copy2clipboard} from '@lib/utils/copy2clipboard';

const appPrefix = process.env.APP_PREFIX;
const baseURL = process.env.BASE_URL;
const baseIMG = process.env.IMGS_URL;
const apiURL = process.env.API_URL;
const sseURL = process.env.SSE_URL;

const rVoid = () => undefined;

export {
  appPrefix,
  baseURL,
  baseIMG,
  apiURL,
  sseURL,
  cn,
  copy2clipboard,
  //
  rVoid,
};
