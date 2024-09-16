const {BOSS_ID: bossId} = process.env;

export const accountAirdropTasksData = [
  {
    id: '01af1af1-1af1-1af1-1af1-1af11af11af1',
    accountAirdropId: '01ac1ac1-1ac1-1ac1-1ac1-1ac11ac11ac1',
    airdropTaskId: '01ad1ad1-1ad1-1ad1-1ad1-1ad11ad11ad1',
    validator: '@firstAccount',
    statusId: 31,
    createdBy: bossId!,
  },

  {
    id: '02af1af1-1af1-1af1-1af1-1af11af11af1',
    accountAirdropId: '01ac1ac1-1ac1-1ac1-1ac1-1ac11ac11ac1',
    airdropTaskId: '02ad1ad1-1ad1-1ad1-1ad1-1ad11ad11ad1',
    validator: 'https://twitter.com/post1',
    statusId: 31,
    createdBy: bossId!,
  },

  {
    id: '03af1af1-1af1-1af1-1af1-1af11af11af1',
    accountAirdropId: '02ac1ac1-1ac1-1ac1-1ac1-1ac11ac11ac1',
    airdropTaskId: '01ad1ad1-1ad1-1ad1-1ad1-1ad11ad11ad1',
    validator: '@secondAccount',
    statusId: 31,
    createdBy: bossId!,
  },
];
