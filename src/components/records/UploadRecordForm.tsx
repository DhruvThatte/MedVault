'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadRecordSchema, type UploadRecordData } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { uploadRecordAction } from '@/app/actions/recordActions';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';
import { useState, type FormEvent } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


export function UploadRecordForm() {
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UploadRecordData>({
    resolver: zodResolver(UploadRecordSchema),
    defaultValues: {
      title: '',
      description: '',
      file: undefined,
      shareWithDoctorWallet: '',
    },
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const data = form.getValues();
    const validationResult = UploadRecordSchema.safeParse(data);

    if (!validationResult.success) {
        form.trigger(); // Manually trigger validation to show errors
        toast({
            title: "Validation Error",
            description: "Please check the form for errors.",
            variant: "destructive",
        });
        return;
    }
    
    if (!publicKey) {
      toast({ title: 'Error', description: 'Wallet not connected.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', validationResult.data.title);
    formData.append('description', validationResult.data.description);
    formData.append('file', validationResult.data.file);
    if (validationResult.data.shareWithDoctorWallet) {
      formData.append('shareWithDoctorWallet', validationResult.data.shareWithDoctorWallet);
    }
    
    const result = await uploadRecordAction(publicKey.toBase58(), formData);

    if (result.success) {
      toast({ title: 'Success', description: result.message });
      form.reset();
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
    setIsSubmitting(false);
  }
  

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
            <UploadCloud className="mr-2 h-7 w-7 text-primary" />
            Upload New Medical Record
        </CardTitle>
        <CardDescription>Fill in the details below to add a new record to your vault.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Annual Checkup Report" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary of the record..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value, ...restField } }) => (
                <FormItem>
                  <FormLabel>Record File</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...restField}
                      className="file:text-primary file:font-semibold"
                    />
                  </FormControl>
                  <FormDescription>Upload PDF, JPG, PNG, or WEBP file (Max 5MB).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shareWithDoctorWallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Share with Doctor (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Doctor's Solana Wallet Address" {...field} />
                  </FormControl>
                   <FormDescription>Enter a doctor's wallet address to share this record upon upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Record'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
