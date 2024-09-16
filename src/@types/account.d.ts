interface Account {
  /** Account iD. */
  id: string;

  /** Wallet Address. */
  wallet: string;

  /** Account Access id. */
  accessId: number;

  /** Referral Code */
  referralCode: string;

  /** Referred By Wallet Address */
  referredBy?: string | null;
}
