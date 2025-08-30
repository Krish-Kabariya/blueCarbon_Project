import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "coastal-guardian-4o2v3",
  appId: "1:99608585075:web:b52711fd76f7712f77db06",
  storageBucket: "coastal-guardian-4o2v3.appspot.com",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCLKpqjrqgukt5wr2HCCeCVk4ldG19A428",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "coastal-guardian-4o2v3.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "99608585075"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
