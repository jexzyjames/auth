import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    OAuthProvider, 
    signInWithPopup, 
    signOut 
  } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxKO85EunTCXr1yEBMFsF0TM52lFdTz8g",
  authDomain: "consoleauths.firebaseapp.com",
  projectId: "consoleauths",
  storageBucket: "consoleauths.firebasestorage.app",
  messagingSenderId: "12904864693",
  appId: "1:12904864693:web:6c69c38772252b3662d7fc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

export { auth, googleProvider, appleProvider, signInWithPopup, signOut };

// Initialize Firebase