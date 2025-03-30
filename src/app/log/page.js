// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";
// import { ref, get } from "firebase/database";
// import styles from "../student/Student.module.css";
// import Link from "next/link";

// export default function StudentLogs() {
//   const searchParams = useSearchParams();
//   const studentKey = searchParams.get("studentKey");

//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     if (studentKey) {
//       const logRef = ref(db, `Log`);
//       get(logRef)
//         .then((snapshot) => {
//           if (snapshot.exists()) {
//             setLogs(Object.values(snapshot.val()));
//           } else {
//             setLogs([]);
//           }
//         })
//         .catch((error) => console.error("Error fetching logs:", error));
//     }
//   }, [studentKey]);

//   return (
//     <div>

//          <div>
//         <nav className={styles.navbar}>
//         <ul>
//           <li><Link href="/home">Home</Link></li>
//           <li><Link href="/student">Student</Link></li> {/* Updated for routing */}
//           <li><Link href="/course">Courses</Link></li>
//           <li><Link href="/log">Logs</Link></li>
//         </ul>
//       </nav>
//         </div>

//       <h2>Update Logs</h2>
//       {logs.length === 0 ? (
//         <p>No logs available</p>
//       ) : (
//         <table className={styles.logTable}>
//           <thead>
//             <tr>
//               <th>Timestamp</th>
//               <th>Updated By</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {logs.map((log, index) => (
//               <tr key={index}>
//                 <td>{new Date(log.timestamp).toLocaleString()}</td>
//                 <td>{log.username}</td>
//                 <td>{log.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
      
//     </div>
//   );
// }


"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, get } from "firebase/database";
import styles from "../student/Student.module.css";
import Link from "next/link";
import Logout from "../components/Logout";

export default function StudentLogs() {
  const searchParams = useSearchParams();
  

  const [logs, setLogs] = useState([]);

  useEffect(() => {
      const logRef = ref(db, `Log`); // Assuming logs are under 'Log' node
      get(logRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const logData = snapshot.val();
            setLogs(Object.values(logData)); // Convert object to array
          } else {
            setLogs([]);
          }
        })
        .catch((error) => console.error("Error fetching logs:", error));
    
  }, []);

  console.log(logs); // For debugging

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
      </header><center>
    <div className={styles.logUpdates}>
    <h2>Update Logs</h2>
    {logs.length === 0 ? (
    <p>No logs available</p>
    ) : (
    <table className={styles.logTable}>
        <thead>
        <tr>
            <th>Timestamp</th>
            <th>Updated By</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {logs.map((log, index) => (
            <tr key={index}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.username}</td>
            <td>{log.description}</td>
            </tr>
        ))}
        </tbody>
    </table>
    )}</div></center>
    
    <footer className={styles.footer}>
        <p>&copy; 2025 Department of Software Engineering</p>
      </footer>
  </div>

  );
}





