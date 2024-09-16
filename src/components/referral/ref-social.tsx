'use client';

import React from 'react';

// import {
//   FacebookShare,
//   LinkedinShare,
//   RedditShare,
//   TelegramShare,
//   TwitterShare,
//   WhatsappShare,
// } from 'react-share-kit';

import {
  FacebookShare,
  LinkedinShare,
  RedditShare,
  TelegramShare,
  TwitterShare,
  WhatsappShare,
} from 'react-share-lite';

type Props = {
  url: string;
};

const config = {
  title: 'Check out OnePay',
  borderRadius: 10,
  size: 40,
};

export function RefSocial({url}: Props) {
  return (
    <div className="mb-6 mt-12">
      <h1 className="mb-6 mt-12">
        Spread the word by sharing your referral link on social media!
      </h1>

      <div className="inline-flex gap-2">
        <div className="flex overflow-hidden rounded-xl border-px p-0 hover:opacity-85">
          <TwitterShare
            url={url}
            {...config}
            hashtags={['OnePay', 'OnePayCool']}
          />
        </div>

        <div className="flex overflow-hidden rounded-xl border-px p-0 hover:opacity-85">
          <RedditShare url={url} {...config} />
        </div>

        <div className="flex overflow-hidden rounded-xl border-px p-0 hover:opacity-85">
          <FacebookShare url={url} {...config} />
        </div>

        <div className="flex overflow-hidden rounded-xl border-px p-0 hover:opacity-85">
          <TelegramShare url={url} {...config} />
        </div>

        <div className="flex overflow-hidden rounded-xl border-px p-0 hover:opacity-85">
          <WhatsappShare url={url} {...config} />
        </div>

        <div className="flex overflow-hidden rounded-xl border-px p-0 hover:opacity-85">
          <LinkedinShare url={url} {...config} />
        </div>
      </div>
    </div>
  );
}
