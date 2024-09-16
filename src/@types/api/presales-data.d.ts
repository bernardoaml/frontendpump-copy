type PresalesMeta = {
  id: string;
  referralCommission: bigint;
  rewardsPerAccount?: number | null;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string | null;
};

type Target = {
  id?: string;
  step: number;
  target: number;
  achieved: number;
  tolerance: number;
  value: number;
  dateLimit: Date | null;
  started: Date | null;
  ended: Date | null;
};

interface PresalesData {
  meta: PresalesMeta;
  starts: Date;
  hasStarted: boolean;
  isOpen: boolean;
  total: number;
  achieved: number;
  remaining2next: number;
  currentTarget?: Target;
  nextTarget?: Target;
  lastTarget: Target;
  progressStep: number;
  progressFull: number;
  token2usd: number;
  wallets: Record<string, string[]>;
}
