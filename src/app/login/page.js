// "use client";
// import { useState } from "react";
// import styles from "../Login.module.css";

// export default function Login({ setIsLoggedIn }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // ✅ Fix: Define error state

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (username === "user123" && password === "123") {
//       setIsLoggedIn(true);  // ✅ Fix: Use setIsLoggedIn from props
//       alert("Login successful!");
//     } else {
//       setError("Invalid username or password. Try again.");
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <form onSubmit={handleSubmit} className={styles.loginForm}>
//         <h2>Login</h2>
//         {error && <p className={styles.error}>{error}</p>} {/* ✅ Fix: Display error message */}

//         <div className={styles.formGroup}>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className={styles.loginButton}>Login</button>
//       </form>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import styles from "../Login.module.css";
import styles from "../globals.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true); // Set user as logged in
      alert("Login successful!");
    } catch (err) {
      setError(err.message); // Show Firebase error message
    }
  };

  return (
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
  );
}
