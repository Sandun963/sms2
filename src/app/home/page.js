import Link from "next/link";
import styles from "../Home.module.css";
import Logout from "../components/Logout";


export default function Home() {
  return (
    <div className={styles.homePage}>
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
              <th width='100px'>          <Logout /></th>
            </tr>
          </table>
        </div>
        <nav className={styles.navbar}>
        <ul>
          <li><Link href="/home">Home</Link></li>
          <li><Link href="/student">Student</Link></li> {/* Updated for routing */}
          <li><Link href="/course">Courses</Link></li>
          <li><Link href="/log">Logs</Link></li>
        </ul>
      </nav>
      </header>
 
      <main className={styles.mainContent}>
        <h1>Software Engineering</h1>
        <p>
          Software engineering is a systematic engineering approach to software development. 
          A software engineer is a person who applies the principles of software engineering to the design, 
          development, maintenance, testing, and evaluation of computer software.
        </p>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 Department of Software Engineering</p>
      </footer>
      
    </div>
    
  );
}
