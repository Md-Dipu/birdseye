import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const firebaseAppInitializer = () => {
    initializeApp(firebaseConfig);
}

export { firebaseAppInitializer };