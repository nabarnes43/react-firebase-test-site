// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL7hQGquTJXMTXaWp9ClW9u7xG5nmNdcs",
  authDomain: "fir-course-99bf6.firebaseapp.com",
  projectId: "fir-course-99bf6",
  storageBucket: "fir-course-99bf6.appspot.com",
  messagingSenderId: "986487993038",
  appId: "1:986487993038:web:65911db3d1de353d01169f",
  measurementId: "G-M1R6CFYMP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);