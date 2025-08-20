
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC91aqBBSCvGs6VQjR-V7vb1WCq1FjvC3M",
  authDomain: "e-clone-52f44.firebaseapp.com",
  databaseURL: "https://e-clone-52f44-default-rtdb.firebaseio.com",
  projectId: "e-clone-52f44",
  storageBucket: "e-clone-52f44.firebasestorage.app",
  messagingSenderId: "30862280979",
  appId: "1:30862280979:web:12c6961477e6d35f56b2e6",
  measurementId: "G-W36Q65LFLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const realtimeDb = getDatabase(app);
const storage = getStorage(app);

// Initialize Analytics conditionally to avoid errors
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { auth, firestore, realtimeDb, storage };
export default app;
