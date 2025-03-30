import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <nav className={styles.navbar}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/student">Student</Link></li> {/* Updated for routing */}
          <li><Link href="/course">Courses</Link></li>
          <li><Link href="/log">Logs</Link></li>
        </ul>
      </nav>
      <main className={styles.mainContent}>
        <h1>Software Engineering</h1>
        <p>
          Software engineering is a systematic engineering approach to software development. 
          A software engineer is a person who applies the principles of software engineering to the design, 
          development, maintenance, testing, and evaluation of computer software.
        </p>
      </main>
    </div>
  );
}
