import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYUpNFKkACaVesbmf73l4S2lNa3roo270",
  authDomain: "sih2026-d6c90.firebaseapp.com",
  projectId: "sih2026-d6c90",
  storageBucket: "sih2026-d6c90.firebasestorage.app",
  messagingSenderId: "256883123032",
  appId: "1:256883123032:web:32b8018ae454c5159b3b2d"
};

// Initialize Firebase safely for client & SSR environments
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
