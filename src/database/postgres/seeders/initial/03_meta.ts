const {BOSS_ID: bossId} = process.env;

export const metaData = [
  {
    id: '00b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
    bankWallets: {
      solana: ['25HfLs1e4UGRMmfN7sM2Nbxy86e3SkcMUMnDFQ5PSTnh'],
    },
    referralCommission: 5n,
    rewardsPerAccount: 3,
    createdBy: bossId!,
  },
];
