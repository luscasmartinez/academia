import { 
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
  getFirestore
} from 'firebase/firestore';
import { AuditLog } from '../types/audit';

const db = getFirestore();

export const logAction = async (
  userId: string,
  userEmail: string,
  action: string,
  details: string,
  module: AuditLog['module']
): Promise<void> => {
  try {
    const auditRef = collection(db, 'auditLogs');
    await addDoc(auditRef, {
      userId,
      userEmail,
      action,
      details,
      module,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error logging action:', error);
  }
};

export const getAuditLogs = async (
  filters?: { 
    userId?: string;
    module?: AuditLog['module'];
    startDate?: Date;
    endDate?: Date;
  }
): Promise<AuditLog[]> => {
  try {
    let q = query(
      collection(db, 'auditLogs'),
      orderBy('timestamp', 'desc')
    );

    if (filters?.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }
    if (filters?.module) {
      q = query(q, where('module', '==', filters.module));
    }
    if (filters?.startDate) {
      q = query(q, where('timestamp', '>=', Timestamp.fromDate(filters.startDate)));
    }
    if (filters?.endDate) {
      q = query(q, where('timestamp', '<=', Timestamp.fromDate(filters.endDate)));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as AuditLog[];
  } catch (error) {
    console.error('Error getting audit logs:', error);
    throw error;
  }
};