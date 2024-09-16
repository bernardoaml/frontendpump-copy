const defaultMaxLimit = 100;

export const parsePagination = (
  sp: URLSearchParams,
  user: Account,
  allowAll: boolean,
) => {
  const p = 'p' in sp ? String(sp.p) : null;
  const l = 'l' in sp ? String(sp.l) : null;
  const a = allowAll ? ('a' in sp ? String(sp.a) : null) : false;

  const all =
    a === undefined || a === null || a === '0' || a === 'false' ? false : true;

  const page = all ? 1 : Math.abs(parseInt(p ?? '1'));
  const limit = l ? Math.abs(parseInt(l)) : undefined;

  const maxLimit = all ? false : user.accessId <= 4 ? false : defaultMaxLimit;

  const newLimit = limit
    ? maxLimit === false || limit <= maxLimit
      ? limit
      : maxLimit
    : 10;

  const offset = page ? (page - 1) * (newLimit || 1) : null;

  const next = all ? false : page + 1;
  const prev = page - 1 || false;

  return {all, page, limit: all ? null : newLimit, offset, prev, next};
};
