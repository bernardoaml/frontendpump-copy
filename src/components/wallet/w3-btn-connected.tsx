'use client';

import React, {useCallback, useMemo} from 'react';

import {useRouter} from 'next/navigation';

import {useWallet} from '@solana/wallet-adapter-react';
import {signOut} from 'next-auth/react';
import {toast} from 'sonner';

import {IoCopyOutline as CopyIcon} from 'react-icons/io5';
import {VscDebugDisconnect as DisconnectIcon} from 'react-icons/vsc';

import {Button} from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';

import {WalletIcon} from './wallet-icon';

export function W3BtnConnected() {
  const router = useRouter();

  const {disconnect, publicKey, wallet} = useWallet();

  const pk = useMemo(() => {
    if (!publicKey) return 'No wallet';
    const base58 = publicKey.toBase58();
    return base58.slice(0, 4) + '...' + base58.slice(-4);
  }, [publicKey]);

  const handleCopy = useCallback(() => {
    if (!publicKey) return;

    const pkFull = publicKey.toBase58();

    navigator.clipboard.writeText(pkFull).then(() =>
      toast.success(
        <div className="flex flex-col">
          <span>Wallet Address Copied:</span>
          <span className="mt-1 font-mono text-[10px]">{pkFull}</span>
        </div>,
      ),
    );
  }, [publicKey]);

  const handleDisconnect = useCallback(async () => {
    toast.loading('Disconnecting', {id: 'w3Conn'});

    disconnect()
      .then(async () => {
        await signOut({redirect: false});
        toast.success('Disconnected', {id: 'w3Conn'});
        router.push('/');
        router.refresh();
      })
      .catch(() => {});
  }, [disconnect, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          // className="h-10 w-36  sm:h-12 sm:w-40"
          className="highlight highlightSelected border-px h-10  w-[134px] border-spacing-2 rounded-3xl border-[--wui-gray-glass-010] bg-[--wui-gray-glass-005] p-2 px-6 font-mono font-semibold text-[--wui-color-fg-100] text-cyan-200 sm:h-12 sm:w-40"
        >
          <WalletIcon wallet={wallet} className="mr-1 sm:mr-2" />
          <span className="ml-2 text-xs sm:text-sm">{pk}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* <DropdownMenuLabel className="inline-flex items-center">
          <WalletIcon wallet={wallet} className="mr-2 h-4 w-4" />
          <span className="ml-2">{wallet?.adapter.name ?? 'Connected'}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator /> */}

        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="h-10 w-full cursor-pointer justify-start"
            onClick={handleCopy}
          >
            <CopyIcon className="mx-1 h-5 w-5" />
            <span className="ml-2">Copy Address</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="h-10 w-full cursor-pointer justify-start"
            onClick={handleDisconnect}
          >
            <DisconnectIcon className="mx-1 h-5 w-5" />
            <span className="ml-2">Disconnect</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
