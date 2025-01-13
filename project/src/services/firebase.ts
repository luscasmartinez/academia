import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7vppSIzZ7lp83YPE7eGs6O7OcSFD0MR0",
  authDomain: "academia-38be8.firebaseapp.com",
  projectId: "academia-38be8",
  storageBucket: "academia-38be8.firebasestorage.app",
  messagingSenderId: "789358256179",
  appId: "1:789358256179:web:5671ec4b4c486a8a450346"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);