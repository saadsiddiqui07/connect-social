import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZEEcpM041S3AlgvSWYfIOG1UygeDCQ5g",
  authDomain: "connect-social-7.firebaseapp.com",
  projectId: "connect-social-7",
  storageBucket: "connect-social-7.appspot.com",
  messagingSenderId: "712465645742",
  appId: "1:712465645742:web:19f512cee815154caded3f",
  measurementId: "G-PK2EPF9BT6",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { app, db, storage, auth, provider };
