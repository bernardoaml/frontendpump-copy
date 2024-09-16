/* eslint-disable @typescript-eslint/no-explicit-any */
type Meta = Record<string, unknown> & {
  linkType?: string;
  link?: string;
  url?: string;
  path?: string;
  params?: Record<string, any>;
};

const parseXLink = (meta: Meta) => {
  const {url, path, params} = meta;

  const p = new URLSearchParams({
    ...(params?.screen_name ? {screen_name: params.screen_name} : {}),
    ...(params?.url ? {url: params.url} : {}),
    ...(params?.via ? {via: params.via} : {}),
    ...(params?.text ? {text: params.text} : {}),
    ...(params?.related ? {related: params.related.join(',')} : {}),
    ...(params?.hashtags ? {hashtags: params.hashtags.join(',')} : {}),
    ...(params?.original_referer
      ? {original_referer: params.original_referer}
      : {}),
  });

  return `${url}${path}?${p.toString()}`;
};

export const parseLink = (meta: Meta): string => {
  switch (meta.linkType) {
    case 'x':
      return parseXLink(meta);

    default:
      return encodeURIComponent(meta?.link ?? `${meta?.url}${meta?.path}`);
  }
};
