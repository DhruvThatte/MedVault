'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WalletConnectButton } from '@/components/auth/WalletConnectButton';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { connected, connecting, publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connecting && !connected) {
      router.replace('/'); 
    }
  }, [connected, connecting, router]);

  if (connecting) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center p-6 bg-card rounded-lg shadow-xl">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-6 text-xl font-semibold text-foreground">Connecting to wallet...</p>
        <p className="mt-2 text-muted-foreground">Please approve the connection in your wallet.</p>
      </div>
    );
  }

  if (!connected) {
     return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center p-8 bg-card rounded-lg shadow-xl text-center">
        <LogIn className="h-20 w-20 text-destructive mb-6" />
        <h2 className="text-3xl font-bold text-foreground mb-3">Access Denied</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          You need to connect your Solana wallet to access the dashboard.
        </p>
        <WalletConnectButton />
        <Button variant="outline" onClick={() => router.push('/')} className="mt-4">
          Go to Homepage
        </Button>
      </div>
    );
  }
  
  // Ensure publicKey is available before rendering children that might depend on it.
  if (!publicKey) {
     return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center p-6 bg-card rounded-lg shadow-xl">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-6 text-xl font-semibold text-foreground">Initializing session...</p>
         <p className="mt-2 text-muted-foreground">Please wait a moment.</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      {children}
    </div>
  );
}
