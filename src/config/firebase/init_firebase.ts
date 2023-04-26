import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";

const initFirebase = initializeApp(firebaseConfig);

export default initFirebase;
