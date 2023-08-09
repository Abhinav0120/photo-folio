// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9czHDN0OMYznhItNS0jF0W6Ff7g81TfI",
  authDomain: "photo-folio-app-751c4.firebaseapp.com",
  projectId: "photo-folio-app-751c4",
  storageBucket: "photo-folio-app-751c4.appspot.com",
  messagingSenderId: "588662924721",
  appId: "1:588662924721:web:6907ddce705e81eac98990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
