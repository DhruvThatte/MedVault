import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export const SolanaAddressSchema = z.string().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, "Invalid Solana address");

export const UploadRecordSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be at most 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be at most 500 characters'),
  file: z
    .custom<File>((val) => val instanceof File, 'Please upload a file')
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB.`)
    .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), `Only .jpg, .png, .webp and .pdf files are allowed.`),
  shareWithDoctorWallet: SolanaAddressSchema.optional().or(z.literal('')),
});

export type UploadRecordData = z.infer<typeof UploadRecordSchema>;

export const ShareRecordSchema = z.object({
  doctorId: SolanaAddressSchema,
});

export type ShareRecordData = z.infer<typeof ShareRecordSchema>;
