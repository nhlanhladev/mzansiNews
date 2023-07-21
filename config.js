// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-LpdseLTF-kdTGaXxvWZrD0CMrexYjz8",
  authDomain: "mzansinews-681cd.firebaseapp.com",
  projectId: "mzansinews-681cd",
  storageBucket: "mzansinews-681cd.appspot.com",
  messagingSenderId: "750565382321",
  appId: "1:750565382321:web:bc5dd4caaf4a03768baa90",
  measurementId: "G-6M9PEXSEPQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const db = getFirestore(app);
