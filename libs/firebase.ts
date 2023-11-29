// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWVa1neRsU7g9AGY-m1H1SHWWAV-4Znzc",
  authDomain: "e-shop-43d57.firebaseapp.com",
  projectId: "e-shop-43d57",
  storageBucket: "e-shop-43d57.appspot.com",
  messagingSenderId: "766618354100",
  appId: "1:766618354100:web:209bbfefa858240d1532e1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp