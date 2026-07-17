// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQz5r8I9tNV3j9yoRsQS0id7edJn8iw0o",
  authDomain: "ai-interview-3ad94.firebaseapp.com",
  projectId: "ai-interview-3ad94",
  storageBucket: "ai-interview-3ad94.firebasestorage.app",
  messagingSenderId: "1020781541347",
  appId: "1:1020781541347:web:ac654533243e45625852d6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// Google Provider
const googleProvider = new GoogleAuthProvider();


export {auth,googleProvider}