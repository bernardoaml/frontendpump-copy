export const transactionTypes: Record<number, SysCode> = {
  20: {
    id: 20,
    name: 'Purchase',
  },
  21: {
    id: 21,
    name: 'Commission',
  },
};

export const transactionTypesIds = Object.keys(transactionTypes).map(Number);
