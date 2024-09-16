const {BOSS_ID: bossId, PRESALES_AIRDROP_ID: airdropId} = process.env;

export const airdropsData = [
  {
    id: airdropId,
    name: 'Participate in OnePay`s Airdrop',
    description:
      'This is the project kick off!!! Join us, help us and get rewarded!!!',
    coinId: 1,
    value: 0n,
    i2c: 6, // interactions to complete - clain = 1 | val = 2 | etc...
    // start: new Date('2024-03-29T20:00:00.420Z'),
    // end: new Date('2024-03-29T20:00:00.420Z'),
    statusId: 32,
    createdBy: bossId!,
  },
];
