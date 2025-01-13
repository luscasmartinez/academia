import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc,
  doc, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Testimonial } from '../types/testimonial';

export const addTestimonial = async (data: Omit<Testimonial, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const testimonialData = {
      ...data,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'testimonials'), testimonialData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw new Error('Failed to add testimonial');
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Testimonial));
  } catch (error) {
    console.error('Error getting testimonials:', error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    const testimonialRef = doc(db, 'testimonials', id);
    await deleteDoc(testimonialRef);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};