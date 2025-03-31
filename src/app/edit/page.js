// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";
// import { ref, get, set } from "firebase/database";
// import styles from "../student/Student.module.css"; // Ensure correct path

// export default function EditStudent() {
//   const searchParams = useSearchParams();
//   const studentId = searchParams.get("studentId");
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     studentId: "",
//     dob: "",
//     enrolledCourses: "",
//     gender: "",
//     phoneNumber: "",
//     intake: "",
//   });

//   const [success, setSuccess] = useState("");

//   // Fetch student details when studentId is provided
//   useEffect(() => {
//     if (studentId) {
//       const studentRef = ref(db, `students/${studentId}`);
//       get(studentRef).then((snapshot) => {
//         if (snapshot.exists()) {
//           setFormData(snapshot.val());
//         } else {
//           console.error("Student not found");
//         }
//       });
//     }
//   }, [studentId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const studentRef = ref(db, `students/${studentId}`);
//     set(studentRef, formData)
//       .then(() => {
//         setSuccess("Student updated successfully!");
//         setTimeout(() => {
//           router.push("/students"); // Redirect to students list
//         }, 2000);
//       })
//       .catch((error) => {
//         console.error("Error updating student:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Edit Student</h2>
//       <form className={styles.studentForm} onSubmit={handleSubmit}>
//         {success && <p className={styles.success}>{success}</p>}

//         {/* First Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="firstName">First Name:</label>
//             <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="lastName">Last Name:</label>
//             <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Second Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="studentId">Student ID:</label>
//             <input type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="dob">Date of Birth:</label>
//             <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Third Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="enrolledCourses">Enroll Courses:</label>
//             <input type="text" id="enrolledCourses" name="enrolledCourses" value={formData.enrolledCourses} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="gender">Gender:</label>
//             <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Fourth Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="phoneNumber">Phone Number:</label>
//             <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="intake">Intake:</label>
//             <select id="intake" name="intake" value={formData.intake} onChange={handleChange} required>
//               <option value="">Select Intake</option>
//               <option value="39">Intake 39</option>
//               <option value="40">Intake 40</option>
//               <option value="41">Intake 41</option>
//             </select>
//           </div>
//         </div>

//         <button type="submit">Update Student</button>
//       </form>
//     </div>
//   );
// }




// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { db } from "../firebaseConfig";
// import { ref, get, update } from "firebase/database";
// import styles from "../student/Student.module.css"; // Ensure correct path

// export default function EditStudent() {
//   const searchParams = useSearchParams();
//   const studentKey = searchParams.get("studentKey"); // Get studentKey from URL
//   const studentId = searchParams.get("studentId"); 
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     studentId: "",
//     dob: "",
//     enrolledCourses: "",
//     gender: "",
//     phoneNumber: "",
//     intake: "",
//   });

//   const [success, setSuccess] = useState("");
//   const [firebaseKey, setFirebaseKey] = useState(null); 

//   // Fetch student details when studentKey is provided
//   useEffect(() => {
//     console.log(studentId)
//     console.log(studentKey)
//     if (studentKey) {
//       console.log("Searching for Student ID:", studentKey);

//       const studentsRef = ref(db, "students");
//       get(studentsRef)
//         .then((snapshot) => {
//           if (snapshot.exists()) {
//             const studentsData = snapshot.val();
//             let foundStudent = null;
//             let key = null;

//             Object.entries(studentsData).forEach(([firebaseKey, student]) => {
//               if (student.studentId === studentKey) {
//                 foundStudent = student;
//                 key = firebaseKey;
//               }
//             });

//             if (foundStudent) {
//               console.log("Student Found:", foundStudent);
//               setFormData(foundStudent);
//               setFirebaseKey(key); // Save the key for updating later
//             } else {
//               console.error("Student not found");
//               setError("Student not found in database.");
//             }
//           } else {
//             console.error("No students data available");
//             setError("No student records found.");
//           }
//         })
//         .catch((err) => {
//           console.error("Error fetching student:", err);
//           setError("Failed to fetch student data.");
//         });
//     }
//   }, [studentId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


// const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!firebaseKey) {
//       setError("Cannot update student, student not found.");
//       return;
//     }

//     const studentRef = ref(db, `students/${firebaseKey}`);
//     update(studentRef, formData)
//       .then(() => {
//         setSuccess("Student updated successfully!");
//         setTimeout(() => {
//           router.push("/student"); 
//         }, 2000);
//       })
//       .catch((error) => {
//         console.error("Error updating student:", error);
//         setError("Failed to update student.");
//       });
//   };


//   return (
//     <div>
//       <h2>Edit Student</h2>
//       <form className={styles.studentForm} onSubmit={handleSubmit}>
//         {success && <p className={styles.success}>{success}</p>}

//         {/* First Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="firstName">First Name:</label>
//             <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="lastName">Last Name:</label>
//             <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Second Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="studentId">Student ID:</label>
//             <input type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="dob">Date of Birth:</label>
//             <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
//           </div>
//         </div>

//         {/* Third Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="enrolledCourses">Enroll Courses:</label>
//             <input type="text" id="enrolledCourses" name="enrolledCourses" value={formData.enrolledCourses} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="gender">Gender:</label>
//             <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Fourth Row */}
//         <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <label htmlFor="phoneNumber">Phone Number:</label>
//             <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="intake">Intake:</label>
//             <select id="intake" name="intake" value={formData.intake} onChange={handleChange} required>
//               <option value="">Select Intake</option>
//               <option value="39">Intake 39</option>
//               <option value="40">Intake 40</option>
//               <option value="41">Intake 41</option>
//             </select>
//           </div>
//         </div>

//         <button type="submit">Update Student</button>
//       </form>
//     </div>
//   );
// }



"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, suspense } from "react";
import { db } from "../firebaseConfig";
import { ref, get, update, push } from "firebase/database";
import styles from "../student/Student.module.css";
import { getAuth } from "firebase/auth";
import Logout from "../components/Logout";


export default function EditStudent() {
  const searchParams = useSearchParams();
  const studentKey = searchParams.get("studentKey");
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    dob: "",
    enrolledCourses: "",
    gender: "",
    phoneNumber: "",
    intake: "",
  });

  const [success, setSuccess] = useState("");
  const [firebaseKey, setFirebaseKey] = useState(null);

  // Fetch student details when studentKey is provided
  useEffect(() => {
    if (studentKey) {
      const studentsRef = ref(db, "students");
      get(studentsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const studentsData = snapshot.val();
            let foundStudent = null;
            let key = null;

            Object.entries(studentsData).forEach(([firebaseKey, student]) => {
              if (student.studentId === studentKey) {
                foundStudent = student;
                key = firebaseKey;
              }
            });

            if (foundStudent) {
              setFormData(foundStudent);
              setFirebaseKey(key);
            } else {
              console.error("Student not found");
            }
          } else {
            console.error("No students data available");
          }
        })
        .catch((err) => console.error("Error fetching student:", err));
    }
  }, [studentKey]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firebaseKey) {
      console.error("Cannot update student, student not found.");
      return;
    }

    const studentRef = ref(db, `students/${firebaseKey}`);
    
    try {
      await update(studentRef, formData);
      await saveUpdateLog();

      setSuccess("Student updated successfully!");
      setTimeout(() => {
        router.push("/student");
      }, 2000);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const saveUpdateLog = async () => {
    const auth = getAuth();
    const user = auth.currentUser;  // Get the current logged-in user
    const username = user ? user.displayName || user.email : "Unknown User";
    const timestamp = new Date().toISOString();
  
    const logRef = ref(db, "Log"); // Logs stored directly under "Log"
  
    // Save new log entry
    await push(logRef, {
      timestamp,
      username,
      description: `Updated student details for ${formData.studentId}`,
    });
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
      <div className={styles.editStudent2}>
      <h2>Edit Student</h2>
      <form className={styles.studentForm} onSubmit={handleSubmit}>
        {success && <p className={styles.success}>{success}</p>}

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="studentId">Student ID:</label>
            <input type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.formRow}>
           <div className={styles.formGroup}>
             <label htmlFor="enrolledCourses">Enroll Courses:</label>
             <input type="text" id="enrolledCourses" name="enrolledCourses" value={formData.enrolledCourses} onChange={handleChange} required />
           </div>
          <div className={styles.formGroup}>
             <label htmlFor="gender">Gender:</label>
             <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
               <option value="">Select</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               <option value="Other">Other</option>
             </select>
           </div>
         </div>

        {/* Fourth Row */}
         <div className={styles.formRow}>
           <div className={styles.formGroup}>
             <label htmlFor="phoneNumber">Phone Number:</label>
             <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
           </div>

          <div className={styles.formGroup}>
             <label htmlFor="intake">Intake:</label>
             <select id="intake" name="intake" value={formData.intake} onChange={handleChange} required>
               <option value="">Select Intake</option>
               <option value="39">Intake 39</option>
               <option value="40">Intake 40</option>
               <option value="41">Intake 41</option>
             </select>
         </div>
         </div>

        <button type="submit">Update Student</button>
      </form></div>
    </div>
  );
}
