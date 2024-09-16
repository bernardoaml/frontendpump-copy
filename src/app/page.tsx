import React from 'react';

import Image from 'next/image';

import TokenList from '@/content/TokenList';
import TokenSlider from '@/content/TokenSlider';
import TokenSliderRaydium from '@/content/TokenSlider/raydium';
import TokenSliderRecent from '@/content/TokenSlider/recent';
import {HomeAirdropContent} from '@/page/home-airdrop-content';
import { BannerTop } from '@/banners/banner-top';
import { AirdropContent } from '@/airdrop/airdrop-content';
import { P } from '@constants/metadata/account';

export default function AirdropStarterPage() {
  return (
    <div className="relative flex flex-col place-items-center px-3 py-8 sm:pt-6 sm:pb-24">
      <BannerTop />
      <TokenSlider />
      <TokenSliderRaydium />
      <TokenSliderRecent />
      <TokenList />
      <HomeAirdropContent />
    </div>
  );
}
