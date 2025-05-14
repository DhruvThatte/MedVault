
'use client';

import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletConnectButton } from '@/components/auth/WalletConnectButton';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, UploadCloud, Users, FileLock2, Network, BarChartBig } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center py-12 ">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          Welcome to MedVault
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80">
          Securely manage, store, and share your medical records with decentralized technology.
          Connect your Solana wallet to get started.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {connected ? (
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          ) : (
             <WalletConnectButton />
          )}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:mt-24 max-w-5xl w-full">
        <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg">
          <ShieldCheck className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
          <p className="text-center text-muted-foreground">
            Your health records are managed with robust security, leveraging blockchain principles for authentication.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg">
          <UploadCloud className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Uploads</h3>
          <p className="text-center text-muted-foreground">
            Quickly upload and categorize your medical documents, images, and reports.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-card rounded-xl shadow-lg">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Controlled Sharing</h3>
          <p className="text-center text-muted-foreground">
            Share your records with healthcare providers securely by granting access via their wallet address.
          </p>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-4xl bg-card rounded-lg shadow-xl overflow-hidden">
        <Image 
          src="https://placehold.co/1200x600.png" 
          alt="MedVault Illustration"
          data-ai-hint="health technology" 
          width={1200} 
          height={600} 
          className="object-cover w-full" 
        />
        <div className="p-8 text-center">
          <h2 className="text-3xl font-semibold text-primary mb-4">The Future of Health Records</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            MedVault empowers you with full control over your medical data. Utilizing the speed and security of the Solana blockchain, 
            we provide a transparent and tamper-proof platform for managing your sensitive health information. 
            Easily share with doctors, track your medical history, and own your data like never before.
          </p>
        </div>
      </div>

      <div className="mt-20 max-w-5xl w-full">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Why Choose MedVault?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg">
            <FileLock2 className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Patient-Centric Control</h3>
            <p className="text-muted-foreground">
              You decide who sees your records and for how long. Full autonomy over your private health data.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg">
            <Network className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seamless & Secure Sharing</h3>
            <p className="text-muted-foreground">
              Effortlessly share specific records with doctors or specialists using secure Solana wallet addresses.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg">
            <BarChartBig className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparent & Immutable</h3>
            <p className="text-muted-foreground">
              Leverage blockchain for an auditable and unalterable history of your medical record access and changes.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
