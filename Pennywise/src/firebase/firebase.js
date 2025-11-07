// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Paste your config from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyCBUj_cyGk8ysWc0IcyK1tVBKFE9qx3sGc",
  authDomain: "pennywise-fd73a.firebaseapp.com",
  projectId: "pennywise-fd73a",
  storageBucket: "pennywise-fd73a.firebasestorage.app",
  messagingSenderId: "932451235627",
  appId: "1:932451235627:web:d0d9c2ce5944e99f0bb76e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
