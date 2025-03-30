// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link"; // Import Link for routing
// import styles from "./page.module.css";
// import Home1 from "./home/page";
// import Login from './login/page'
// import Courses from './course/page'

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentPage, setCurrentPage] = useState("home");

//   return (




//       {/* Main Content */}
//       <main className={styles.main}>
//         {isLoggedIn ? <Home1 /> : <Login setIsLoggedIn={setIsLoggedIn} />}
//       </main>

//       {/* Footer Section */}

//   );
// }

"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import Firebase auth
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
     // setIsLoggedIn(true); // Set user as logged in
     router.push("/home"); 
      alert("Login successful!");
    } catch (err) {
      setError(err.message); // Show Firebase error message
    }
  };

  return (
    <div className={styles.page}>
    <header className={styles.header}>
            <div className={styles.headerContent}>
            <table border={0}  width='100%' height='60px'className={styles.headerTbl}>
                <tr>
                  <th width='100px'><img src="/logo.png" alt="" className={styles.logo} /></th>
                  <th></th>
                  <th width='650px'> <div>
                <h1>General Sir John Kotelawala Defence University</h1>
                <h2>Department of Software Engineering</h2>
              </div></th>
              <th></th>
                  <th width='100px'></th>
                </tr>
              </table>
            </div>
            <nav className={styles.navbar}>
    <marquee direction="left">Welcome to Department of Software Engineering</marquee>
      </nav>
          </header>
    <div className={styles.loginContainer}>
      
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
    <footer className={styles.footer}>
        <p>&copy; 2025 Department of Software Engineering</p>
      </footer>
    </div>
  );
}
