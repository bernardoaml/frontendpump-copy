import type {Wallet} from '@solana/wallet-adapter-react';
import type {DetailedHTMLProps, ImgHTMLAttributes} from 'react';

import React from 'react';

import Image from 'next/image';

export interface WalletIconProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: {adapter: Pick<Wallet['adapter'], 'icon' | 'name'>} | null;
}

export const WalletIcon = ({wallet}: WalletIconProps) => {
  return (
    wallet && (
      <Image
        src={wallet.adapter.icon}
        alt={`${wallet.adapter.name} icon`}
        width={28}
        height={28}
        className="h-5 w-5 sm:h-6 sm:w-6"
      />
    )
  );
};
