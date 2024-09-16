export const generalStatus: Record<number, SysCode> = {
  30: {
    id: 30,
    name: 'Success',
  },

  31: {
    id: 31,
    name: 'Completed',
  },

  32: {
    id: 32,
    name: 'Active',
  },

  33: {
    id: 33,
    name: 'Blocked',
  },

  34: {
    id: 34,
    name: 'Pending',
  },

  35: {
    id: 35,
    name: 'Refunded',
  },

  36: {
    id: 36,
    name: 'Failed',
  },

  37: {
    id: 37,
    name: 'Incomplete',
  },

  38: {
    id: 38,
    name: 'Inactive',
  },

  39: {
    id: 39,
    name: 'Cancelled',
  },
};

export const generalStatusIds = Object.keys(generalStatus).map(Number);
