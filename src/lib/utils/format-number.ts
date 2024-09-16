export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatFixed = (amount: number, decimals?: number) => {
  return amount.toLocaleString('en', {
    maximumFractionDigits: decimals ?? 2,
    minimumFractionDigits: decimals ?? 2,
  });
};

export const formatDateTime = (
  timestamp: number,
  hideSeconds?: boolean,
  hideYear?: boolean,
) => {
  return new Date(timestamp).toLocaleDateString('en', {
    day: '2-digit',
    month: '2-digit',
    ...(hideYear ? {} : {year: 'numeric'}),
    hour: '2-digit',
    minute: '2-digit',
    ...(hideSeconds ? {} : {second: '2-digit'}),
  });
};
