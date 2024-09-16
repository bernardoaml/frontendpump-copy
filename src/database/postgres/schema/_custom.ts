import {customType} from 'drizzle-orm/pg-core';

export const tokenPriceNumber = customType<{data: number}>({
  dataType: () => 'numeric(15, 3)',
  fromDriver: value => Number(value),
});

export const fiatNumber = customType<{data: number}>({
  dataType: () => 'numeric(15, 2)',
  fromDriver: value => Number(value),
});
