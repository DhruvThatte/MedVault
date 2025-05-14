'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletConnectButton() {
  return <WalletMultiButton style={{
    backgroundColor: 'hsl(var(--accent))', 
    color: 'hsl(var(--accent-foreground))',
    borderRadius: 'var(--radius)',
    fontSize: '0.875rem',
    padding: '0.5rem 1rem',
    transition: 'background-color 0.2s ease-in-out',
  }} />;
}
