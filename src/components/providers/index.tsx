'use client';

import {SessionProvider} from 'next-auth/react';
import {Toaster} from 'sonner';

import {W3Listenner} from '@/wallet/w3-listenner';

import {AosProvider} from './aos-provider';
import {BgProvider} from './bg-provider';
import {QueryProvider} from './query-provider';
import {ThemeProvider} from './theme-provider';
import {WalletProvider} from './wallet-provider';

export function Providers({children}: {children?: React.ReactNode}) {
  return (
    <QueryProvider>
      <SessionProvider>
        <ThemeProvider attribute="class">
          <BgProvider>
            <WalletProvider>
              <AosProvider>
                <Toaster
                  pauseWhenPageIsHidden
                  position="top-center"
                  richColors
                  theme="system"
                />
                <W3Listenner />
                {children}
              </AosProvider>
            </WalletProvider>
          </BgProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
