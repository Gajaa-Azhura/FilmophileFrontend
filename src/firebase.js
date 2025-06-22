// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo5N9Epw69ZZ7nHfWQ6thcLAT3dT4BFfw",
  authDomain: "filmophobia-517d9.firebaseapp.com",
  projectId: "filmophobia-517d9",
  storageBucket: "filmophobia-517d9.firebasestorage.app",
  messagingSenderId: "564332227460",
  appId: "1:564332227460:web:564e058afe5a7cc8e7cbd1",
  measurementId: "G-0TB45BJPRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };