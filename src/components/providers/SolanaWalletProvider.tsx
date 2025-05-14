'use client';

import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SOLANA_NETWORK } from '@/lib/solana';

// Helper function to map our SOLANA_NETWORK string to WalletAdapterNetwork enum
const getWalletAdapterNetwork = (networkString: string): WalletAdapterNetwork => {
  if (networkString === 'mainnet-beta') {
    return WalletAdapterNetwork.Mainnet;
  }
  if (networkString === 'testnet') {
    return WalletAdapterNetwork.Testnet;
  }
  return WalletAdapterNetwork.Devnet; // Default to Devnet
};

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = getWalletAdapterNetwork(SOLANA_NETWORK);
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    [] // PhantomWalletAdapter constructor does not depend on the network
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
