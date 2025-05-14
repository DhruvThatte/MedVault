'use client';

import { useState, type Dispatch, type SetStateAction, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShareRecordSchema, type ShareRecordData, SolanaAddressSchema } from '@/lib/validators';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { shareRecordAction } from '@/app/actions/recordActions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ShareRecordDialogProps {
  recordId: string;
  currentSharedList: string[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ShareRecordDialog({ recordId, currentSharedList, isOpen, setIsOpen }: ShareRecordDialogProps) {
  const { toast } = useToast();
  const { publicKey } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ShareRecordData>({
    resolver: zodResolver(ShareRecordSchema),
    defaultValues: {
      doctorId: '',
    },
  });
  
  const onSubmit = async (data: ShareRecordData) => {
    if (!publicKey) {
      toast({ title: 'Error', description: 'Your wallet is not connected.', variant: 'destructive' });
      return;
    }
    if (data.doctorId === publicKey.toBase58()) {
      toast({ title: 'Error', description: 'You cannot share a record with yourself.', variant: 'destructive' });
      return;
    }
    if (currentSharedList.includes(data.doctorId)) {
      toast({ title: 'Info', description: 'This record is already shared with this address.', variant: 'default' });
      return;
    }

    setIsSubmitting(true);
    const result = await shareRecordAction(recordId, data.doctorId);
    if (result.success) {
      toast({ title: 'Success', description: result.message });
      form.reset();
      setIsOpen(false);
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
    setIsSubmitting(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlus className="mr-2 h-6 w-6 text-primary"/>
            Share Medical Record
          </DialogTitle>
          <DialogDescription>
            Enter the Solana wallet address of the doctor you want to share this record with.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
             <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor's Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Solana wallet address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  'Share Record'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
