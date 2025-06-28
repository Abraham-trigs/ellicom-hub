// src/lib/firebase.js
// 🔥 Firebase Initialization – Auth, Firestore, Functions

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// 📦 Firebase config from environment variables (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🚀 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔐 Export initialized Firebase services
export const auth = getAuth(app);                          // 🔐 Firebase Auth
export const db = getFirestore(app);                       // 💾 Firestore DB
export const functions = getFunctions(app, 'africa-south1'); // 🌍 Cloud Functions (targeted region)

// ✨ Export the app instance for modules that require direct access
export { app };
