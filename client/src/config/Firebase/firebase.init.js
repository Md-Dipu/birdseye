import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./firebase.config";

const firebaseAppInitializer = () => {
    return initializeApp(firebaseConfig);
}

const app = firebaseAppInitializer();

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { firebaseAppInitializer, storage };