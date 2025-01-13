import { 
  createUserWithEmailAndPassword,
  deleteUser,
  User
} from 'firebase/auth';
import { 
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
  getFirestore
} from 'firebase/firestore';
import { auth } from '../config/firebase';
import { logAction } from './auditService';

const db = getFirestore();

interface AdminUser {
  uid: string;
  email: string | null;
  createdAt: Date;
}

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const adminUsersRef = collection(db, 'adminUsers');
    const snapshot = await getDocs(adminUsersRef);
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as AdminUser[];
  } catch (error) {
    console.error('Error getting admin users:', error);
    throw error;
  }
};

export const createAdminUser = async (email: string, password: string, currentUser: User): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    const adminUsersRef = collection(db, 'adminUsers');
    await addDoc(adminUsersRef, {
      uid: user.uid,
      email: user.email,
      createdAt: new Date()
    });

    await logAction(
      currentUser.uid,
      currentUser.email || '',
      'create_user',
      `Created new admin user: ${email}`,
      'users'
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

export const deleteAdminUser = async (uid: string, currentUser: User): Promise<void> => {
  try {
    if (currentUser.uid === uid) {
      throw new Error('Você não pode excluir seu próprio usuário');
    }

    const adminUsersRef = collection(db, 'adminUsers');
    const q = query(adminUsersRef, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    await logAction(
      currentUser.uid,
      currentUser.email || '',
      'delete_user',
      `Deleted admin user with ID: ${uid}`,
      'users'
    );
  } catch (error) {
    console.error('Error deleting admin user:', error);
    throw error;
  }
};