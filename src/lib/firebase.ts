import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "coastal-guardian-4o2v3",
  appId: "1:99608585075:web:b52711fd76f7712f77db06",
  storageBucket: "coastal-guardian-4o2v3.firebasestorage.app",
  apiKey: "AIzaSyCLKpqjrqgukt5wr2HCCeCVk4ldG19A428",
  authDomain: "coastal-guardian-4o2v3.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "99608585075"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
