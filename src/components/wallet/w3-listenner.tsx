'use client';

import React, {useCallback, useEffect} from 'react';

import {useWallet} from '@solana/wallet-adapter-react';

export function W3Listenner() {
  const {connect, connected, connecting, wallet} = useWallet();

  const handleConnect = useCallback(() => {
    connect().catch(() => {
      // KEEP EMPTY! any errors are caught by the context `onError` handler
    });
  }, [connect]);

  useEffect(() => {
    if (wallet && !connected && !connecting) handleConnect();
  }, [wallet, connected, connecting, handleConnect]);

  return <></>;
}
