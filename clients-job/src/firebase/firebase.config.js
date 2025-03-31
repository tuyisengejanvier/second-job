// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8LjPqCKG_adb4x5nlN6a_t1mhUXN8xDY",
  authDomain: "web-jobs-1a636.firebaseapp.com",
  projectId: "web-jobs-1a636",
  storageBucket: "web-jobs-1a636.firebasestorage.app",
  messagingSenderId: "694115881205",
  appId: "1:694115881205:web:78700e95bf3c9c34d235bc",
  measurementId: "G-43MSKYE68Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// ✅ Export app (without analytics)
export default app;
