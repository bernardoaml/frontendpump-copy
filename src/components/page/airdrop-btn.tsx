'use client';

import React, {useEffect, useState} from 'react';

import {useWallet} from '@solana/wallet-adapter-react';
import {useSession} from 'next-auth/react';

import {FaCheckCircle as CheckIcon} from 'react-icons/fa';

import {cn} from '@lib/utils';

import {Button} from '@ui/button';

import {W3BtnConnect} from '@/wallet/w3-btn-connect';

type Props = {
  isLoading?: boolean;
  className?: string;
  handleAccount: () => void;
};

export function AirdropBtn({isLoading, className, handleAccount}: Props) {
  const {data: user} = useSession();

  const {connected} = useWallet();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <span className="mt-14 w-full border-spacing-2 rounded-3xl border p-2 px-6 text-sm font-light italic text-[--wui-color-fg-100] text-white">
        wait...
      </span>
    );

  return (
    <div className={cn(className)}>
      {connected ? (
        <Button
          variant="ghost"
          disabled={isLoading}
          className="highlight highlightSelected mt-14 w-full border-spacing-2 rounded-3xl border border-[--wui-gray-glass-010] bg-[--wui-gray-glass-005] p-2 px-6 font-semibold text-[--wui-color-fg-100] text-cyan-200"
          onClick={handleAccount}
        >
          {isLoading ? (
            <span>loading...</span>
          ) : user ? (
            <span>Airdrop Tasks & Affiliate Code </span>
          ) : (
            <>
              <CheckIcon className="mr-2 h-4 w-4" /> Verify your address
            </>
          )}
        </Button>
      ) : (
        <W3BtnConnect>
          <Button
            variant="ghost"
            disabled={isLoading}
            size="lg"
            className="mt-14 border-spacing-2 rounded-2xl border p-2 px-8 font-semibold text-white"
          >
            Connect Wallet
          </Button>
        </W3BtnConnect>
      )}
    </div>
  );
}
