'use client';

import type {WalletProviderProps} from '@solana/wallet-adapter-react';

import React, {useCallback, useMemo} from 'react';

import {WalletSendTransactionError} from '@solana/wallet-adapter-base';
import {CoinbaseWalletAdapter} from '@solana/wallet-adapter-coinbase';
import {
  ConnectionProvider,
  WalletProvider as WProvider,
} from '@solana/wallet-adapter-react';
import {clusterApiUrl} from '@solana/web3.js';
import {toast} from 'sonner';

// import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';

export function WalletProvider({children}: {children: React.ReactNode}) {
  const endpoint = clusterApiUrl('devnet');

  // const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(
    () => [
      // new UnsafeBurnerWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    // [network],
    [],
  );

  const handleError: NonNullable<WalletProviderProps['onError']> = useCallback(
    error => {
      // if (error instanceof WalletNotConnectedError) return;
      console.log('\n------------------------------\n');
      console.log('🪲 ~ WALLET ERROR:', error);
      console.log('\n------------------------------\n');

      if (
        error instanceof WalletSendTransactionError &&
        error.message === 'invalid account'
      ) {
        toast.warning('Invalid Account! Refreshing the page');
        return window.location.reload();
      }

      toast.warning(error.message);
    },
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WProvider wallets={wallets} onError={handleError}>
        {children}
      </WProvider>
    </ConnectionProvider>
  );
}
