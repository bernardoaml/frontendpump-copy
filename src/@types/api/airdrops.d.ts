interface AirdropTask {
  id: string;
  airdropId: string;
  name: string;
  description: string;
  meta: Record<string, unknown>;
  value: bigint;
  start: Date | null;
  end: Date | null;
  statusId: number;
  status?: string;
}

interface Airdrop {
  id: string;
  name: string;
  description: string;
  coinId: number;
  value: bigint;
  start: Date | null;
  end: Date | null;
  i2c: number;
  statusId: number;
  tasks?: null | Record<string, AirdropTask>;
}

interface AccountAirdropTask {
  id: string;
  taskId: string;
  taskName?: string;
  taskValue?: bigint;
  validator: string | null;
  statusId: number;
  status?: string;
}

interface AccountAirdrop {
  id: string;
  accountId: string;
  airdropId: string;
  airdropName?: string;
  airdropDescription?: string;
  airdropValue: bigint;
  totalAchieved: bigint;
  ic: number;
  statusId: number;
  status?: string;
  tasks?: null | Record<string, AccountAirdropTask>;
}
