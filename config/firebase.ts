import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import credential from "./firebase_credential.json";
const app = initializeApp(credential);

export const auth = getAuth(app);
