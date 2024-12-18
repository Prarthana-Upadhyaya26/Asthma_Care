// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlMAhBhhqrOJV32TLFwnrkLiZ1usgU_DU",
  authDomain: "my-first-app-b0bc8.firebaseapp.com",
  projectId: "my-first-app-b0bc8",
  storageBucket: "my-first-app-b0bc8.firebasestorage.app",
  messagingSenderId: "353939572674",
  appId: "1:353939572674:web:206491c5520ae6ff1d785b",
  measurementId: "G-PKRVEHCBR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };