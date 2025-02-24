import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { db } from "./firebase";

export interface Plan {
  id?: string;
  name: string;
  price: string;
  features: string[];
  highlight: boolean;
  special: boolean;
  order: number;
}

export const savePlan = async (plan: Omit<Plan, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "plans"), plan);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving plan: ", error);
    return { success: false, error };
  }
};

export const updatePlan = async (id: string, plan: Partial<Plan>) => {
  try {
    const planRef = doc(db, "plans", id);
    await updateDoc(planRef, plan);
    return { success: true };
  } catch (error) {
    console.error("Error updating plan: ", error);
    return { success: false, error };
  }
};

export const deletePlan = async (id: string) => {
  try {
    const planRef = doc(db, "plans", id);
    await deleteDoc(planRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting plan: ", error);
    return { success: false, error };
  }
};

export const getPlansSnapshot = (callback: (plans: Plan[]) => void) => {
  const q = query(collection(db, "plans"), orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const plans = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Plan[];
    callback(plans);
  });
};