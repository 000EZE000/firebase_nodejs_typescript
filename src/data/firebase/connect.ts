import { getFirestore } from "firebase/firestore";
import initFirebase from "../../config/firebase/init_firebase";

const db = getFirestore(initFirebase);

export default db;
