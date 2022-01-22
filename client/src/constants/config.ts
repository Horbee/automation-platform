import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const AppConfig = {
  firebaseConfig: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ?? ""
  }
};

// Initialize Firebase
const app = initializeApp(AppConfig.firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
