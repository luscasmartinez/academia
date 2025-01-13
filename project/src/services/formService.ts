import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp, 
  query, 
  orderBy,
  arrayUnion
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { FormData, Comment } from '../types/submission';

export const submitForm = async (data: Omit<FormData, 'createdAt' | 'id' | 'status'>): Promise<string> => {
  try {
    const formData: Omit<FormData, 'id'> = {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
      comments: []
    };

    const docRef = await addDoc(collection(db, 'submissions'), formData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error('Failed to submit form');
  }
};

export const getSubmissions = async (): Promise<FormData[]> => {
  try {
    const submissionsRef = collection(db, 'submissions');
    const q = query(submissionsRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FormData));
  } catch (error) {
    console.error('Error getting submissions:', error);
    throw error;
  }
};

export const updateSubmissionStatus = async (id: string, status: 'pending' | 'completed') => {
  try {
    const submissionRef = doc(db, 'submissions', id);
    await updateDoc(submissionRef, { status });
  } catch (error) {
    console.error('Error updating submission status:', error);
    throw error;
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    const submissionRef = doc(db, 'submissions', id);
    await deleteDoc(submissionRef);
  } catch (error) {
    console.error('Error deleting submission:', error);
    throw error;
  }
};

export const addComment = async (submissionId: string, comment: string) => {
  try {
    const submissionRef = doc(db, 'submissions', submissionId);
    const newComment: Comment = {
      text: comment,
      createdAt: Date.now()
    };
    await updateDoc(submissionRef, {
      comments: arrayUnion(newComment)
    });
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};