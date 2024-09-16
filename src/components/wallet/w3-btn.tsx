'use client';

import React, {useEffect, useState} from 'react';

import {useWallet} from '@solana/wallet-adapter-react';

import {IoWalletOutline as WalletIcon} from 'react-icons/io5';

import {Button} from '@ui/button';

import {W3BtnConnect} from '@/wallet/w3-btn-connect';
import {W3BtnConnected} from '@/wallet/w3-btn-connected';

export function W3Btn() {
  const {connected} = useWallet();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-12 w-40 rounded-md border border-input bg-background shadow-sm" />
    );

  return (
    <div className="flex h-12 w-40 items-center justify-center text-lg">
      {connected ? (
        <W3BtnConnected />
      ) : (
        <W3BtnConnect>
          {/* <Button className="h-12 w-40"> */}
          <Button className="highlight highlightSelected h-10 w-[134px]  border-spacing-2 rounded-3xl border-px border-[--wui-gray-glass-010] bg-[--wui-gray-glass-005] p-2 px-6 font-mono font-semibold text-[--wui-color-fg-100] text-cyan-200 sm:h-12 sm:w-40">
            <WalletIcon className="mr-2 h-7 w-7" /> Connect
          </Button>
        </W3BtnConnect>
      )}
    </div>
  );
}
