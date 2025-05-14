'use client';

import { useEffect, useState } from 'react';
import { getSharedRecordsAction } from '@/app/actions/recordActions';
import { RecordList } from '@/components/records/RecordList';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { ListChecks, Loader2 } from 'lucide-react';
import type { MedicalRecord } from '@/types';

export default function SharedRecordsPage() {
  const { publicKey, connected } = useWallet();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      if (publicKey) {
        setIsLoading(true);
        const fetchedRecords = await getSharedRecordsAction(publicKey.toBase58());
        setRecords(fetchedRecords);
        setIsLoading(false);
      } else if (connected === false) {
        setIsLoading(false);
      }
    }
    if (connected) {
        fetchRecords();
    } else {
        setIsLoading(false);
    }
  }, [publicKey, connected]);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <ListChecks className="mr-3 h-8 w-8 text-primary" />
            Records Shared With Me
          </CardTitle>
          <CardDescription>
            View medical records that patients have shared with your wallet address.
          </CardDescription>
        </CardHeader>
      </Card>
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
           <p className="ml-4 text-lg">Loading shared records...</p>
        </div>
      ) : (
        <RecordList 
          records={records} 
          isOwnerList={false} 
          emptyListTitle="No Records Shared"
          emptyListMessage="Currently, no medical records have been shared with your wallet address."
        />
      )}
    </div>
  );
}
