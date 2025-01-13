import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { PortfolioItem } from '../types/portfolio';

export const addPortfolioItem = async (data: Omit<PortfolioItem, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const portfolioData = {
      ...data,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'portfolio'), portfolioData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    throw new Error('Failed to add portfolio item');
  }
};

export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const portfolioRef = collection(db, 'portfolio');
    const q = query(portfolioRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PortfolioItem));
  } catch (error) {
    console.error('Error getting portfolio items:', error);
    throw error;
  }
};

export const updatePortfolioItem = async (id: string, data: Partial<PortfolioItem>) => {
  try {
    const portfolioRef = doc(db, 'portfolio', id);
    await updateDoc(portfolioRef, data);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    throw error;
  }
};

export const deletePortfolioItem = async (id: string) => {
  try {
    const portfolioRef = doc(db, 'portfolio', id);
    await deleteDoc(portfolioRef);
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    throw error;
  }
};