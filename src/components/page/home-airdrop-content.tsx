'use client';

import React, {useCallback, useEffect, useState} from 'react';

import {useRouter} from 'next/navigation';

import {useWallet} from '@solana/wallet-adapter-react';
import base58 from 'bs58';
import {getCsrfToken, signIn, useSession} from 'next-auth/react';
import {toast} from 'sonner';

import {FcLock as SecureIcon} from 'react-icons/fc';
import {IoWalletOutline as WalletIcon} from 'react-icons/io5';

import {SigninMessage} from '@lib/utils/signin-msg';

import {AirdropBtn} from '@/page/airdrop-btn';

import {
  missingParams,
  noWalletConnected,
  signInErr,
} from '@constants/common-errors';

export function HomeAirdropContent() {
  const router = useRouter();

  const {data: user} = useSession();

  const {connected, publicKey, signMessage} = useWallet();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleError = useCallback((msg: string) => {
    if (msg) toast.warning(msg, {id: 'ams'});
  }, []);

  const handleAccountConnection = useCallback(async () => {
    if (!connected || !publicKey || !signMessage)
      return toast.error(noWalletConnected);

    toast.loading('Waiting for signed message...', {id: 'ams'});

    const csrf = await getCsrfToken();
    if (!csrf) return toast.error(missingParams, {id: 'ams'});

    const message = new SigninMessage({
      domain: window.location.host,
      publicKey: publicKey?.toBase58(),
      statement: `OnePay\nSign this message to access data account on https://onepay.co\n\n`,
      nonce: csrf,
    });

    const msgData = new TextEncoder().encode(message.prepare());
    const signature = await signMessage(msgData).catch((err: Error) => {
      return {signMsgError: err.message};
    });

    if ('signMsgError' in signature) return handleError(signature.signMsgError);

    const serializedSignature = base58.encode(signature);

    const lData = await signIn('credentials', {
      message: JSON.stringify(message),
      signature: serializedSignature,
      redirect: false,
    }).catch((err: Error) => {
      return {errorMsg: err.message};
    });

    if (!lData) return handleError(signInErr);
    if ('errorMsg' in lData) return handleError(signInErr);
    if (lData?.error) return handleError(signInErr);

    toast.success('Success! Redirecting...', {id: 'ams', duration: 1000});

    router.push('/account');
  }, [connected, handleError, publicKey, router, signMessage]);

  const handleAccount = useCallback(async () => {
    if (!user) return handleAccountConnection();
    router.push('/account/airdrop');
  }, [user, handleAccountConnection, router]);

  if (!mounted) return <></>;

  return (
    <div
      className="mt-4 flex flex-col items-center justify-center gap-4"
      data-aos="fade-in"
      data-aos-delay="300"
      data-aos-duration="1000"
    >
      <AirdropBtn {...{user, handleAccount}} />

      {!connected ? (
        <span className="inline-flex items-center text-sm">
          <WalletIcon className="-mt-0.5 mr-2 h-5 w-5 text-primary" />
          Connect your wallet to start
        </span>
      ) : (
        !user && (
          <span className="inline-flex items-center text-xs">
            <SecureIcon className="-mt-1 mr-2 h-5 w-5 text-primary" />
            Prove you are the owner of the address
          </span>
        )
      )}
    </div>
  );
}
