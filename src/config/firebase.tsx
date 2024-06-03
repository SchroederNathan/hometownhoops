// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYgVjUMPzNlFHfC9UERVyhTqRECwBpFz0",
  authDomain: "hometown-hoops.firebaseapp.com",
  projectId: "hometown-hoops",
  storageBucket: "hometown-hoops.appspot.com",
  messagingSenderId: "1052804535741",
  appId: "1:1052804535741:web:9a00fa788731e91a94aed4",
  measurementId: "G-274EBFWY9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app)