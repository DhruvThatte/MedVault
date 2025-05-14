'use server';

import { db, storage } from '@/lib/firebase';
import type { MedicalRecord, MedicalRecordInput } from '@/types';
import { UploadRecordSchema as UploadRecordSchemaValidator } from '@/lib/validators';

import { collection, addDoc, Timestamp, updateDoc, doc, arrayUnion, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { revalidatePath } from 'next/cache';

export async function uploadRecordAction(
  patientWallet: string,
  formData: FormData
): Promise<{ success: boolean; message: string; recordId?: string }> {
  if (!patientWallet) {
    return { success: false, message: 'Patient wallet not provided.' };
  }

  const rawFormData = {
    title: formData.get('title'),
    description: formData.get('description'),
    file: formData.get('file'),
    shareWithDoctorWallet: formData.get('shareWithDoctorWallet'),
  };
  
  const validation = UploadRecordSchemaValidator.safeParse(rawFormData);

  if (!validation.success) {
    return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
  }

  const { title, description, file, shareWithDoctorWallet } = validation.data;

  try {
    // Upload file to Firebase Storage
    const storageRef = ref(storage, `medical_records/${patientWallet}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(snapshot.ref);

    // Add record metadata to Firestore
    const newRecord: Omit<MedicalRecord, 'id'> = {
      patientWallet,
      title,
      description,
      fileURL,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      createdAt: Timestamp.now(),
      sharedWith: shareWithDoctorWallet ? [shareWithDoctorWallet] : [],
    };

    const docRef = await addDoc(collection(db, 'medicalRecords'), newRecord);
    
    revalidatePath('/dashboard/my-records');
    if (shareWithDoctorWallet) {
      revalidatePath('/dashboard/shared-with-me'); // If shared, doctor might need to see it
    }

    return { success: true, message: 'Record uploaded successfully!', recordId: docRef.id };
  } catch (error: any) {
    console.error('Error uploading record:', error);
    return { success: false, message: error.message || 'Failed to upload record.' };
  }
}

export async function shareRecordAction(
  recordId: string,
  doctorWallet: string
): Promise<{ success: boolean; message: string }> {
  if (!recordId || !doctorWallet) {
    return { success: false, message: 'Record ID or Doctor wallet not provided.' };
  }

  try {
    const recordRef = doc(db, 'medicalRecords', recordId);
    await updateDoc(recordRef, {
      sharedWith: arrayUnion(doctorWallet),
    });

    revalidatePath('/dashboard/my-records'); // Update list of shared doctors
    revalidatePath(`/dashboard/shared-with-me`); // Doctor needs updated list if it's them

    return { success: true, message: 'Record shared successfully with ' + doctorWallet };
  } catch (error: any) {
    console.error('Error sharing record:', error);
    return { success: false, message: error.message || 'Failed to share record.' };
  }
}

export async function getMyRecordsAction(patientWallet: string): Promise<MedicalRecord[]> {
  if (!patientWallet) return [];
  try {
    const q = query(
      collection(db, 'medicalRecords'),
      where('patientWallet', '==', patientWallet),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MedicalRecord));
  } catch (error) {
    console.error("Error fetching patient records:", error);
    return [];
  }
}

export async function getSharedRecordsAction(doctorWallet: string): Promise<MedicalRecord[]> {
   if (!doctorWallet) return [];
  try {
    const q = query(
      collection(db, 'medicalRecords'),
      where('sharedWith', 'array-contains', doctorWallet),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MedicalRecord));
  } catch (error) {
    console.error("Error fetching shared records:", error);
    return [];
  }
}
