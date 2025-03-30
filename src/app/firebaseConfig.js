// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getFirestore } from "firebase/firestore"; // For Firestore

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhCedDqSrZR4kZaVMri-MR3TotLl7_5wE",
    authDomain: "student-management-syste-ba94a.firebaseapp.com",
    projectId: "student-management-syste-ba94a",
    storageBucket: "student-management-syste-ba94a.firebasestorage.app",
    messagingSenderId: "455108690778",
    appId: "1:455108690778:web:a0bd601d72975cfa25e963",
    databaseURL: "https://student-management-syste-ba94a-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app); // Realtime Database
export const firestore = getFirestore(app); // Firestore

export default app;
