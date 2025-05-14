'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { ArrowRight, FilePlus2, FileText, ListChecks, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { publicKey } = useWallet();

  if (!publicKey) {
    return null; // Layout handles loading/redirect
  }

  const features = [
    {
      title: 'Upload New Record',
      description: 'Add a new medical document to your secure vault.',
      href: '/dashboard/upload',
      icon: <FilePlus2 className="h-8 w-8 text-primary" />,
    },
    {
      title: 'My Medical Records',
      description: 'View and manage all your uploaded health records.',
      href: '/dashboard/my-records',
      icon: <FileText className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Records Shared With Me',
      description: 'Access records that other patients have shared with you (for doctors).',
      href: '/dashboard/shared-with-me',
      icon: <ListChecks className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <UserCheck className="mr-3 h-8 w-8 text-primary" />
            Welcome to Your MedVault Dashboard
          </CardTitle>
          <CardDescription className="text-md">
            Your connected wallet: <span className="font-mono text-sm text-accent break-all">{publicKey.toBase58()}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Here you can manage your health records, upload new documents, and view records shared with you by patients if you are a healthcare provider.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex-grow">
              <div className="mb-4">{feature.icon}</div>
              <CardTitle className="text-2xl">{feature.title}</CardTitle>
              <CardDescription className="mt-1">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={feature.href}>
                  Go to {feature.title.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
