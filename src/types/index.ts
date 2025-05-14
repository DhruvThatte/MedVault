import type { Timestamp } from 'firebase/firestore';

export interface MedicalRecord {
  id: string;
  patientWallet: string;
  title: string;
  description: string;
  fileURL: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: Timestamp;
  sharedWith: string[]; // Array of doctor wallet public keys
}

export interface MedicalRecordInput {
  title: string;
  description: string;
  file: File;
  shareWithDoctorWallet?: string;
}
