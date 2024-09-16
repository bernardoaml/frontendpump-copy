interface Transaction {
  id: string;
  userId: string;
  typeId: number;
  statusId: number;
  coinId: number;
  value: bigint;
  targetId?: string | null;
  toAccountId?: string | null;
  txHash?: string | null;
}

interface PreTransaction extends Omit<Transaction, 'id'> {}
