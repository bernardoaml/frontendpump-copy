import type {Wallet} from '@solana/wallet-adapter-react';

import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion';

import {WalletListItem} from '@/wallet/wallet-list-item';

type Props = {
  wallets: Wallet[];
  hasListed?: boolean;
  handleModal: (state: boolean) => void;
};

export function W3ExtraWallets({wallets, hasListed, handleModal}: Props) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="justify-end gap-2 [&[data-state=closed]>span#extra-wallet-opened]:hidden [&[data-state=open]>span#extra-wallet-closed]:hidden">
          <span id="extra-wallet-opened">
            {hasListed ? 'Less options' : 'Hide'}
          </span>
          <span id="extra-wallet-closed">
            {hasListed ? 'More options' : 'Already have a wallet? View'}
          </span>
        </AccordionTrigger>

        <AccordionContent>
          {(wallets ?? []).map(wallet => (
            <li key={wallet.adapter.name}>
              <WalletListItem {...{wallet, handleModal}} />
            </li>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
