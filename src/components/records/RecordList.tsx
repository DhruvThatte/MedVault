'use client';

import type { MedicalRecord } from '@/types';
import { RecordCard } from './RecordCard';
import { AlertCircle, Files } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface RecordListProps {
  records: MedicalRecord[];
  isOwnerList?: boolean; // True if displaying patient's own records
  emptyListMessage?: string;
  emptyListTitle?: string;
}

export function RecordList({ records, isOwnerList = false, emptyListMessage, emptyListTitle }: RecordListProps) {
  if (records.length === 0) {
    return (
      <Alert className="shadow-md">
        <Files className="h-5 w-5" />
        <AlertTitle>{emptyListTitle || (isOwnerList ? "No Records Found" : "No Records Shared With You")}</AlertTitle>
        <AlertDescription>
          {emptyListMessage || (isOwnerList 
            ? "You haven't uploaded any medical records yet. Start by uploading your first record." 
            : "There are currently no medical records shared with your wallet address.")}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {records.map((record) => (
        <RecordCard key={record.id} record={record} isOwner={isOwnerList} />
      ))}
    </div>
  );
}
