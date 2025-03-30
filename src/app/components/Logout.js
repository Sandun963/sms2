"use client";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig"; // Import auth directly from firebaseConfig
import styles from "../Home.module.css";



export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("loggedInUser"); // Remove stored user info
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading} className={styles.logoutBtn}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
