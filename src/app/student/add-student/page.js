"use client";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, push, set } from "firebase/database";
import styles from "../Student.module.css";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import Logout from "../../components/Logout";
import "../globals.css"; // ✅ Correct way to import global CSS



export default function StudentAdd() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    dob: "",
    enrolledCourses: "",
    gender: "",
    phoneNumber: "",
    intake: "", // Added intake field
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        description: `Add student ${formData.studentId}`,
      });
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentRef = ref(db, "students");

    try {
      const newStudentRef = push(studentRef);
      await set(newStudentRef, formData);

      setSuccess("Student added successfully!");
      await saveUpdateLog();
      setFormData({
        firstName: "",
        lastName: "",
        studentId: "",
        dob: "",
        enrolledCourses: "",
        gender: "",
        phoneNumber: "",
        intake: "", // Reset intake
      });

    } catch (error) {
      console.error("Error saving student:", error);
    }
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
         <div className={styles.mainContent2}>
      <main className={styles.mainContent}>
  <form className={styles.studentForm} onSubmit={handleSubmit}>
    {success && <p className={styles.success}>{success}</p>}

    {/* First Row */}
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

    {/* Second Row */}
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

    {/* Third Row */}
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

    {/* Submit Button */}
    <button type="submit" className={styles.fsubmitButton}>Submit</button>
  </form>
</main></div>


      <footer className={styles.footer}>
        <p>&copy; 2025 Department of Software Engineering</p>
      </footer>
    </div>
  );
}

