import type {Wallet} from '@solana/wallet-adapter-react';

import React, {memo, useCallback} from 'react';

import {WalletReadyState} from '@solana/wallet-adapter-base';
import {useWallet} from '@solana/wallet-adapter-react';
// import {useWallet} from '@solana/wallet-adapter-react';
import {toast} from 'sonner';

import {Button} from '@ui/button';

import {WalletIcon} from '@/wallet/wallet-icon';

export interface W3ListItemProps {
  wallet: Wallet;
  tabIndex?: number;
  handleModal: (state: boolean) => void;
}

const openNewTab = (link: string) => window.open(link, '_blank');

const WalletListItem = memo(
  ({wallet, tabIndex, handleModal}: W3ListItemProps) => {
    const {select} = useWallet();

    const handleClick = useCallback(() => {
      if (wallet.readyState === WalletReadyState.NotDetected) {
        handleModal(false);
        return toast.error('Wallet not detected', {
          ...(wallet?.adapter?.url
            ? {
                action: {
                  label: 'Install',
                  onClick: () => openNewTab(wallet.adapter.url),
                },
              }
            : {}),
        });
      }

      if (wallet.readyState === WalletReadyState.Unsupported)
        return toast.error('Wallet not supported');

      select(wallet.adapter.name);
    }, [
      handleModal,
      select,
      wallet.adapter.name,
      wallet.adapter.url,
      wallet.readyState,
    ]);

    return (
      <Button
        variant="ghost"
        className="mb-2 h-12 w-full justify-between"
        onClick={handleClick}
        tabIndex={tabIndex}
      >
        <div className="inline-flex items-center">
          <WalletIcon wallet={wallet} />
          <span className="ml-2">{wallet.adapter.name}</span>
        </div>

        {wallet.readyState === WalletReadyState.Installed && (
          <span className="ml-2 text-[10px] italic">Detected</span>
        )}
      </Button>
    );
  },
);

WalletListItem.displayName = 'WalletListItem';

export {WalletListItem};
