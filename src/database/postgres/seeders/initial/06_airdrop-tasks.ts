const {BOSS_ID: bossId, PRESALES_AIRDROP_ID} = process.env;

export const airdropTasksData = [
  {
    id: '0139a189-4d7e-49a9-927d-5ea07753b89c',
    airdropId: PRESALES_AIRDROP_ID!,
    name: 'Follow us on Twitter',
    description:
      "Click the button below to follow us on X, Activate Notifications to stay tuned and drop your X Handle Below so we know you're in",
    meta: {
      type: 'linkWithValidator',
      linkType: 'x',
      linkLabel: 'Follow @OnePaySolana',
      linkReturn: 'X Handle',
      url: 'https://twitter.com',
      path: '/intent/follow',
      params: {
        screen_name: 'OnePaySolana',
      },
    },
    value: 0n,
    // start: new Date('2024-03-29T20:00:00.420Z'),
    // end: new Date('2024-03-29T20:00:00.420Z'),
    statusId: 32,
    createdBy: bossId!,
  },

  {
    id: '02007567-fab0-4104-82ee-36ec45aa2d0c',
    airdropId: PRESALES_AIRDROP_ID!,
    name: 'Post on Twitter',
    description:
      'Click the button below to post about us on X and paste the X Post Link below for verification',
    meta: {
      type: 'linkWithValidator',
      linkType: 'x',
      linkLabel: 'Post #OnePaySolana',
      linkReturn: 'X post URL',
      url: 'https://twitter.com',
      path: '/intent/post',
      params: {
        hashtags: ['OnePay', 'Solana'],
        // hashtags: 'solana',
        original_referer: 'https://onepay.cool/',
        text: 'I just discovered a new amazing project! Check it out',
        related: ['solana'],
        url: 'https://onepay.cool',
        via: 'OnePaySolana',
        // in_reply_to: '1234',
      },
    },
    value: 0n,
    // start: new Date('2024-03-29T20:00:00.420Z'),
    // end: new Date('2024-03-29T20:00:00.420Z'),
    statusId: 32,
    createdBy: bossId!,
  },

  {
    id: '037754cd-2a93-4ca4-a42c-40f56427ecde',
    airdropId: PRESALES_AIRDROP_ID!,
    name: 'Repost Tweet',
    description: 'Repost our pinned tweet to get 1000 tokens',
    // meta: {
    //   type: 'linkWithValidator ',
    //   validator: 'X repost URL',
    //   url: 'https://twitter.com',
    //   path: '/intent/post',
    //   params: {
    //     // hashtags: ['OnePay', 'Solana'],
    //     hashtags: 'solana',
    //     original_referer: 'https://onepay.cool/',
    //     text: 'I just discovered a new project! Check it out through @OnePaySolana',
    //     related: ['onepay', 'solana', 'airdrop'],
    //     url: 'https://onepay.cool',
    //     via: 'OnePaySolana',
    //     // in_reply_to: '1234',
    //   },
    // },
    value: 0n,
    // start: new Date('2024-03-29T20:00:00.420Z'),
    // end: new Date('2024-03-29T20:00:00.420Z'),
    statusId: 32,
    createdBy: bossId!,
  },
];
