// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "adcontrol-hub",
  "appId": "1:465898073957:web:2795773f02a18a84b5fb8c",
  "storageBucket": "adcontrol-hub.firebasestorage.app",
  "apiKey": "AIzaSyDc1WFSM-sSdiw4q1eMDpUjV9gqmQ5hZhk",
  "authDomain": "adcontrol-hub.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "465898073957"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
