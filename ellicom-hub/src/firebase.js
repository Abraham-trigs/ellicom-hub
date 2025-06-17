// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPDtFYVjyuP-v2Ql8djLumVmL7lOdRn1k",
  authDomain: "ellicom-hub.firebaseapp.com",
  projectId: "ellicom-hub",
  storageBucket: "ellicom-hub.firebasestorage.app",
  messagingSenderId: "385561403566",
  appId: "1:385561403566:web:7fa46b90242457a1404d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
