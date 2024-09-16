'use client';

import type {DismissableLayerProps} from '@radix-ui/react-dialog';
import type {Wallet} from '@solana/wallet-adapter-react';

import React, {useCallback, useMemo, useState} from 'react';

import {DotLottiePlayer} from '@dotlottie/react-player';
import {WalletReadyState} from '@solana/wallet-adapter-base';
import {useWallet} from '@solana/wallet-adapter-react';
import {toast} from 'sonner';

import '@dotlottie/react-player/dist/index.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';

import {W3ExtraWallets} from '@/wallet/w3-extra-wallets';
import {WalletListItem} from '@/wallet/wallet-list-item';
import {WalletSVG} from '@/wallet/wallet-svg';

export type ModalState = 'open' | 'closed' | 'hold';

type Props = {
  children: React.ReactNode;
};

export function W3BtnConnect({children}: Props) {
  const {wallets, connecting} = useWallet();

  const [modal, setModal] = useState(false);

  const handleOverlay = useCallback<
    NonNullable<DismissableLayerProps['onInteractOutside']>
  >(e => e.preventDefault(), []);

  const [listedWallets, collapsedWallets] = useMemo(() => {
    const installed: Wallet[] = [];

    const notInstalled: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      } else {
        notInstalled.push(wallet);
      }
    }

    return installed.length ? [installed, notInstalled] : [notInstalled, []];
  }, [wallets]);

  const handleModal = useCallback((state: boolean) => setModal(state), []);

  const handleModalCloseBtn = useCallback(
    (state: boolean) => {
      if (!state && connecting)
        return toast.info('Waiting for Wallet Confirmation...');

      setModal(state);
    },
    [connecting],
  );

  return (
    <Dialog open={modal} onOpenChange={handleModalCloseBtn}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        onInteractOutside={handleOverlay}
        hideCloseBtn={connecting}
      >
        {connecting ? (
          <div className="mx-auto flex-col items-center justify-center p-4">
            <h1 className="mb-4 text-center">Connecting...</h1>
            <div className="mx-auto h-40 w-40">
              <DotLottiePlayer src="/wallet-waiting.lottie" autoplay loop />
            </div>
          </div>
        ) : listedWallets.length ? (
          <>
            <DialogHeader>
              <DialogTitle>Connect a wallet on Solana to continue</DialogTitle>
              {/* <DialogClose /> */}

              <DialogDescription>
                Select a wallet to connect to the Solana network
              </DialogDescription>
            </DialogHeader>

            <ul>
              {listedWallets.map(wallet => (
                <li key={wallet.adapter.name}>
                  <WalletListItem {...{wallet, handleModal}} />
                </li>
              ))}

              {!!collapsedWallets.length && (
                <W3ExtraWallets
                  wallets={collapsedWallets}
                  hasListed
                  handleModal={handleModal}
                />
              )}
            </ul>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {`You'll need a wallet on Solana to continue`}
              </DialogTitle>

              <WalletSVG />
            </DialogHeader>

            {!!collapsedWallets.length && (
              <ul>
                <W3ExtraWallets
                  wallets={collapsedWallets}
                  handleModal={handleModal}
                />
              </ul>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
