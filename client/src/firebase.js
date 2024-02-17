// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDASZAoSfat7kQf5YWhgfRFERpLHYRLqFs",
  authDomain: "carproject-2a245.firebaseapp.com",
  projectId: "carproject-2a245",
  storageBucket: "carproject-2a245.appspot.com",
  messagingSenderId: "23793614623",
  appId: "1:23793614623:web:b8fc0780cb4e85341fba2a",
  measurementId: "G-3CFSEY0DX4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
