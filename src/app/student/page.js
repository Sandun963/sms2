// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation"; // Import useRouter for navigation
// import Link from "next/link";
// import styles from "./Student.module.css";

// export default function Student() {
//   const [isStudentVisible, setIsStudentVisible] = useState(false);
//   const [intake, setIntake] = useState("");
//   const router = useRouter(); // Initialize router

//   // Handle intake dropdown change
//   const handleIntakeChange = (e) => {
//     setIntake(e.target.value);
//   };

//   // Handle submit button click
//   const handleSubmit = () => {
//     if (intake) {
//       console.log(`Selected Intake: ${intake}`);
//       setIsStudentVisible(true);
//     } else {
//       alert("Please select an intake.");
//     }
//   };

//   // Function to navigate to Add Student page
//   const handleStudentClick = () => {
//     if (intake) {
//       router.push("/student/add-student");
//     } else {
//       alert("Please select an intake first.");
//     }
//   };

//   // Function to navigate back to the home page
//   const handleBackClick = () => {
//     router.push("/");
//   };

//   return (
//     <div className={styles.studentPage}>
//       <header className={styles.header}>
//         <div className={styles.headerContent}>
//           <img src="/logo.png" alt="University Logo" className={styles.logo} />
//           <div>
//             <h1>General Sir John Kotelawala Defence University</h1>
//             <h2>Department of Software Engineering</h2>
//           </div>
//         </div>
//       </header>

//       <nav className={styles.navbar}>
//         <ul>
//           <li><Link href="/home">Home</Link></li>
//           <li><Link href="/student">Student</Link></li>
//           <li><Link href="#">Courses</Link></li>
//           <li><Link href="#">Logs</Link></li>
//         </ul>
//       </nav>

//       <main className={styles.mainContent}>
//         {/* Choose Intake Section */}
//         <div className={styles.intakeSelection}>
//           <label htmlFor="intake">Choose Intake:</label>
//           <select id="intake" value={intake} onChange={handleIntakeChange}>
//             <option value="">Select</option>
//             <option value="39">Intake 39</option>
//             <option value="40">Intake 40</option>
//             <option value="41">Intake 41</option>
//           </select>
//           <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
//         </div>

//         {/* Centered Buttons for Student & Courses */}
//         <div className={styles.centerButtons}>

//             {isStudentVisible && (
//             <button className={styles.studentButton} onClick={handleStudentClick}>
//               Add Student
//             </button>
//              )}
          
//         </div>

//         {/* Back Button */}
//         <div className={styles.backButtonContainer}>
//           <button className={styles.backButton} onClick={handleBackClick}>
//             Back
//           </button>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <p>&copy; 2025 Department of Software Engineering</p>
//       </footer>
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { db } from "../firebaseConfig"; // Import Firebase DB
// import { ref, get, remove } from "firebase/database"; // Firebase functions
// import styles from "./Student.module.css";

// export default function Student() {
//   const [isStudentVisible, setIsStudentVisible] = useState(false);
//   const [intake, setIntake] = useState("");
//   const [students, setStudents] = useState([]); // Store fetched student data
//   const router = useRouter();

//   // Handle intake dropdown change
//   const handleIntakeChange = (e) => {
//     setIntake(e.target.value);
//   };

//   // Fetch students when clicking submit
//   const handleSubmit = async () => {
//     if (!intake) {
//       alert("Please select an intake.");
//       return;
//     }
//     setIsStudentVisible(true);

//     try {
//       const studentRef = ref(db, "students");
//       const snapshot = await get(studentRef);

//       if (snapshot.exists()) {
//         const studentData = snapshot.val();
//         const filteredStudents = Object.values(studentData).filter(
//           (student) => student.intake === intake
//         );

//         setStudents(filteredStudents)
//       } else {
//         setStudents([]); // No students found
//       }
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//       alert("Failed to load student data.");
//     }
//   };

//   // Navigate to Add Student page
//   const handleStudentClick = () => {
//     if (intake) {
//       router.push("/student/add-student");
//     } else {
//       alert("Please select an intake first.");
//     }
//   };

//   // Navigate back to Home page
//   const handleBackClick = () => {
//     router.push("/home");
//   };

//   const handleDelete = (studentId) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this student?");
    
//     if (isConfirmed) {
//       try {
//         const studentRef = ref(db, `students/${studentId}`);
//         remove(studentRef)
//           .then(() => {
//             alert("Student deleted successfully.");
//             setStudents((prevStudents) => prevStudents.filter(student => student.studentId !== studentId));
//           })
//           .catch((error) => {
//             console.error("Error deleting student:", error);
//             alert("Failed to delete student.");
//           });
//       } catch (error) {
//         console.error("Error:", error);
//         alert("An error occurred while deleting the student.");
//       }
//     }
//   };
  
//   // const handleEdit = (studentId) => {
//   //   router.push(`/student/add-student?studentId=${studentId}`);
//   // };
//   const handleEdit = (studentKey) => {
//     router.push(`/edit?page=edit-student&studentKey=${studentKey}`);
//   };
  

//   return (
//     <div className={styles.studentPage}>
//       <header className={styles.header}>
//         <div className={styles.headerContent}>
//           {/* <img src="/logo.png" alt="University Logo" className={styles.logo} /> */}
//           <div>
//             <h1>General Sir John Kotelawala Defence University</h1>
//             <h2>Department of Software Engineering</h2>
//           </div>
//         </div>
//       </header>

//       <nav className={styles.navbar}>
//         <ul>
//           <li><Link href="/home">Home</Link></li>
//           <li><Link href="/student">Student</Link></li>
//           <li><Link href="/course">Courses</Link></li>
//           <li><Link href="/log">Logs</Link></li>
//         </ul>
//       </nav>

//       <main className={styles.mainContent}>
//         {/* Choose Intake Section */}
//         <div className={styles.intakeSelection}>
//           <label htmlFor="intake">Choose Intake</label>
//           <select id="intake" value={intake} onChange={handleIntakeChange}>
//             <option value=" ">Select</option>
//             <option value="39">Intake 39</option>
//             <option value="40">Intake 40</option>
//             <option value="41">Intake 41</option>
//           </select>
//           <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
//         </div>

//       {/* Buttons for Student & Courses */}
//       <div className={styles.centerButtons}>
//           {isStudentVisible && (
//             <button className={styles.studentButton} onClick={handleStudentClick}>
//               Add Student
//             </button>
//           )}
//         </div>

//         {/* Student List */}
// {students.length > 0 && (
//   <div className={styles.studentList}>
//     <h3>Students in Intake {intake}</h3>
//     <ul>
//       {students.map((student, index) => (
//         <li key={index} className={styles.studentRow}>
//           <div className={styles.studentInfo}>
//             {student.firstName} {student.lastName} - {student.studentId}
//           </div>
//           <div className={styles.studentActions}>
//             <button
//               className={styles.editButton}
//               onClick={() => handleEdit(student.studentId)}
//             >
//               Edit
//             </button>
//             <button
//               className={styles.deleteButton}
//               onClick={() => handleDelete(student.studentId)}
//             >
//               Delete
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}


        


//           {/* <div className={styles.backButtonContainer}>
//           <button className={styles.backButton} onClick={handleBackClick}>
//             Back
//           </button>
//         </div> */}
//       </main>  

//       <footer className={styles.footer}>
//         <p>&copy; 2025 Department of Software Engineering</p>
//       </footer>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "../firebaseConfig"; // Import Firebase DB
import { ref, get, remove, push } from "firebase/database"; // Firebase functions
import styles from "./Student.module.css";
import { getAuth } from "firebase/auth";
import Logout from "../components/Logout";

export default function Student() {
  const [isStudentVisible, setIsStudentVisible] = useState(false);
  const [intake, setIntake] = useState("");
  const [students, setStudents] = useState([]); // Store fetched student data
  const [searchQuery, setSearchQuery] = useState(""); // Store search query for studentId
  const router = useRouter();

  // Handle intake dropdown change
  const handleIntakeChange = (e) => {
    setIntake(e.target.value);
  };

  // Fetch students when clicking submit
  const handleSubmit = async () => {
    if (!intake) {
      alert("Please select an intake.");
      return;
    }
    setIsStudentVisible(true);

    try {
      const studentRef = ref(db, "students");
      const snapshot = await get(studentRef);

      if (snapshot.exists()) {
        const studentData = snapshot.val();
        const filteredStudents = Object.values(studentData).filter(
          (student) => student.intake === intake
        );

        setStudents(filteredStudents);
      } else {
        setStudents([]); // No students found
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("Failed to load student data.");
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter students based on the search query
  const filteredStudents = students.filter((student) =>
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to Add Student page
  const handleStudentClick = () => {
    if (intake) {
      router.push("/student/add-student");
    } else {
      alert("Please select an intake first.");
    }
  };

  // Navigate back to Home page
  const handleBackClick = () => {
    router.push("/home");
  };

  const handleDelete = async (studentId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");
  
    if (isConfirmed) {
      try {
        const studentsRef = ref(db, "students");
        const snapshot = await get(studentsRef);
  
        if (snapshot.exists()) {
          const studentsData = snapshot.val();
          let studentKey = null;
  
          // Find the unique key of the student
          Object.entries(studentsData).forEach(([key, student]) => {
            if (student.studentId === studentId) {
              studentKey = key;
            }
          });
  
          if (studentKey) {
            const studentRef = ref(db, `students/${studentKey}`);
            await remove(studentRef);
            alert("Student deleted successfully.");
            await saveUpdateLog(studentId);
            setStudents((prevStudents) => prevStudents.filter(student => student.studentId !== studentId));
          } else {
            alert("Student not found.");
          }
        } else {
          alert("No students available.");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student.");
      }
    }
  };
  
    const saveUpdateLog = async (studentId) => {
      const auth = getAuth();
      const user = auth.currentUser;  // Get the current logged-in user
      const username = user ? user.displayName || user.email : "Unknown User";
      const timestamp = new Date().toISOString();
    
      const logRef = ref(db, "Log"); // Logs stored directly under "Log"
    
      // Save new log entry
      await push(logRef, {
        timestamp,
        username,
        description: `Delete student details for ${studentId}`,
      });
    };

  const handleEdit = (studentKey) => {
    router.push(`/edit?page=edit-student&studentKey=${studentKey}`);
  };

  return (
    <div className={styles.studentPage1}>
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
        {/* Choose Intake Section */}
        <div className={styles.intakeSelection}>
          <label htmlFor="intake">Choose Intake</label>
          <select id="intake" value={intake} onChange={handleIntakeChange}>
            <option value=" ">Select</option>
            <option value="39">Intake 39</option>
            <option value="40">Intake 40</option>
            <option value="41">Intake 41</option>
          </select>
          <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
        </div>
        {/* Buttons for Student & Courses */}
        <div className={styles.centerButtons}>
          {isStudentVisible && (
            <button className={styles.studentButton} onClick={handleStudentClick}>
              Add Student
            </button>
          )}
        </div>

        {/* Show Search Bar if students are visible */}
        {isStudentVisible && (
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by Student ID"
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        )}

        

        {/* Student List */}
        {filteredStudents.length > 0 && (
          <div className={styles.studentList}>
            <h3>Students in Intake {intake}</h3>
            <ul>
              {filteredStudents.map((student, index) => (
                <li key={index} className={styles.studentRow}>
                  <div className={styles.studentInfo}>
                    {student.firstName} {student.lastName} - {student.studentId}
                  </div>
                  <div className={styles.studentActions}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(student.studentId)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(student.studentId)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>  

      <footer className={styles.footer}>
        <p>&copy; 2025 Department of Software Engineering</p>
      </footer>
    </div>
  );
}
