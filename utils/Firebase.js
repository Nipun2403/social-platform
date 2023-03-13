// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Extra Added Imports
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { execOnce } from "next/dist/shared/lib/utils";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMV8nPqL65C0bLWT8Z9d0kIvevE7h0RbA",
  authDomain: "daily-thought-9e679.firebaseapp.com",
  projectId: "daily-thought-9e679",
  storageBucket: "daily-thought-9e679.appspot.com",
  messagingSenderId: "621904642845",
  appId: "1:621904642845:web:6ffa80cf31f326b448d7f4",
  measurementId: "G-W68MRB49WW"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export const auth = getAuth(app);
export {db};