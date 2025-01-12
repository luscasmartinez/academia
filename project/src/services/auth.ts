import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.code === 'auth/invalid-credential' 
        ? 'Email ou senha inválidos'
        : 'Erro ao fazer login' 
    };
  }
};

export const signOut = () => firebaseSignOut(auth);

export const useAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};