import Link from 'next/link';
import { Hospital } from 'lucide-react';
import { WalletConnectButton } from '@/components/auth/WalletConnectButton';

export function Navbar() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Hospital className="h-7 w-7" />
          <span>MedVault</span>
        </Link>
        <WalletConnectButton />
      </div>
    </header>
  );
}
