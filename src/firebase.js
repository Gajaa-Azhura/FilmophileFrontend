import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDo5N9Epw69ZZ7nHfWQ6thcLAT3dT4BFfw",
  authDomain: "filmophobia-517d9.firebaseapp.com",
  projectId: "filmophobia-517d9",
  storageBucket: "filmophobia-517d9.appspot.com", // fixed typo: should be .appspot.com
  messagingSenderId: "564332227460",
  appId: "1:564332227460:web:564e058afe5a7cc8e7cbd1",
  measurementId: "G-0TB45BJPRP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider(); // Correct usage for GitHub provider