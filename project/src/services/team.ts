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

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  order: number;
}

export const saveTeamMember = async (member: Omit<TeamMember, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "team"), member);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving team member: ", error);
    return { success: false, error };
  }
};

export const updateTeamMember = async (id: string, member: Partial<TeamMember>) => {
  try {
    const memberRef = doc(db, "team", id);
    await updateDoc(memberRef, member);
    return { success: true };
  } catch (error) {
    console.error("Error updating team member: ", error);
    return { success: false, error };
  }
};

export const deleteTeamMember = async (id: string) => {
  try {
    const memberRef = doc(db, "team", id);
    await deleteDoc(memberRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting team member: ", error);
    return { success: false, error };
  }
};

export const getTeamSnapshot = (callback: (team: TeamMember[]) => void) => {
  const q = query(collection(db, "team"), orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const team = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TeamMember[];
    callback(team);
  });
};