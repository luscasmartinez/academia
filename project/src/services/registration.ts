import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface Registration {
  name: string;
  email: string;
  phone: string;
  plan: string;
  preferredDate?: string;
  preferredTime?: string;
  registrationDate: Date;
}

export const saveRegistration = async (registration: Omit<Registration, "registrationDate">) => {
  try {
    const registrationWithDate = {
      ...registration,
      registrationDate: new Date()
    };
    
    const docRef = await addDoc(collection(db, "registrations"), registrationWithDate);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving registration: ", error);
    return { success: false, error };
  }
};