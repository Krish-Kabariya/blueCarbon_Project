import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "coastal-guardian-4o2v3",
  appId: "1:99608585075:web:b52711fd76f7712f77db06",
  storageBucket: "coastal-guardian-4o2v3.firebasestorage.app",
  apiKey: "AIzaSyCLKpqjrqgukt5wr2HCCeCVk4ldG19A428",
  authDomain: "coastal-guardian-4o2v3.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "99608585075"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
