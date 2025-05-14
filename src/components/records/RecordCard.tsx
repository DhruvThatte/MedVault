'use client';

import type { MedicalRecord } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Share2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { ShareRecordDialog } from './ShareRecordDialog';
import { useState } from 'react';

interface RecordCardProps {
  record: MedicalRecord;
  isOwner: boolean;
}

export function RecordCard({ record, isOwner }: RecordCardProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const fileSizeMB = (record.fileSize / (1024 * 1024)).toFixed(2);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <FileText className="h-10 w-10 text-primary mb-3" />
          {isOwner && (
             <Button variant="ghost" size="icon" onClick={() => setIsShareDialogOpen(true)} title="Share Record">
                <Share2 className="h-5 w-5 text-accent" />
             </Button>
          )}
        </div>
        <CardTitle className="text-xl truncate" title={record.title}>{record.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Uploaded on: {format(record.createdAt.toDate(), 'PPP p')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed" title={record.description}>{record.description}</p>
        <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>File:</strong> <span className="font-mono">{record.fileName}</span></p>
            <p><strong>Type:</strong> {record.fileType}</p>
            <p><strong>Size:</strong> {fileSizeMB} MB</p>
        </div>
        {isOwner && record.sharedWith && record.sharedWith.length > 0 && (
          <div className="pt-2">
            <h4 className="text-xs font-semibold flex items-center text-foreground">
              <Users className="h-4 w-4 mr-1 text-primary" />
              Shared with:
            </h4>
            <ul className="text-xs text-muted-foreground list-disc list-inside">
              {record.sharedWith.map((docWallet) => (
                <li key={docWallet} className="font-mono truncate" title={docWallet}>{docWallet}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href={record.fileURL} target="_blank" rel="noopener noreferrer" download={record.fileName}>
            <Download className="mr-2 h-4 w-4" /> Download Record
          </a>
        </Button>
      </CardFooter>
      {isOwner && <ShareRecordDialog recordId={record.id} currentSharedList={record.sharedWith} isOpen={isShareDialogOpen} setIsOpen={setIsShareDialogOpen} />}
    </Card>
  );
}
