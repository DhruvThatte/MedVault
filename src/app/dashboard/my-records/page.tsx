'use client';

import { useEffect, useState } from 'react';
import { getMyRecordsAction } from '@/app/actions/recordActions';
import { RecordList } from '@/components/records/RecordList';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { FileText, Loader2 } from 'lucide-react';
import type { MedicalRecord } from '@/types';

export default function MyRecordsPage() {
  const { publicKey, connected } = useWallet();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      if (publicKey) {
        setIsLoading(true);
        const fetchedRecords = await getMyRecordsAction(publicKey.toBase58());
        setRecords(fetchedRecords);
        setIsLoading(false);
      } else if (connected === false) { // explicitly false, not just null
        setIsLoading(false); // Not connected, stop loading
      }
    }
    if (connected) { // only fetch if connected status is determined
        fetchRecords();
    } else {
        // if not connected and not connecting, can stop loading
        setIsLoading(false);
    }
  }, [publicKey, connected]);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <FileText className="mr-3 h-8 w-8 text-primary" />
            My Medical Records
          </CardTitle>
          <CardDescription>
            View, manage, and share your uploaded health records.
          </CardDescription>
        </CardHeader>
      </Card>
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Loading your records...</p>
        </div>
      ) : (
        <RecordList records={records} isOwnerList={true} />
      )}
    </div>
  );
}
