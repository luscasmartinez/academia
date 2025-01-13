import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDsjhjhzkN-tOxfiSwhL7F2lq2jblfd2B8",
  authDomain: "testant-faa77.firebaseapp.com",
  projectId: "testant-faa77",
  storageBucket: "testant-faa77.firebasestorage.app",
  messagingSenderId: "284750867828",
  appId: "1:284750867828:web:902e1075324bdb31889021"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistence not available in this browser');
  }
});