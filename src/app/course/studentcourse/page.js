'use client'; // Ensure this is treated as a client-side component
import Link from "next/link";
import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig'; // Make sure the path to firebaseConfig is correct
import styles from '../../student/Student.module.css'; // Make sure this is the correct path for styles
import Logout from "../../components/Logout";


const StudentCourses = () => {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [studyYear, setStudyYear] = useState('');
  const [semester, setSemester] = useState('')

  const calculateYearAndSemester = (intake) => {
    // Map intake to intake year and set default intake month as January
    const intakeYearMap = {
      39: 2022,
      40: 2023,
      41: 2024,
      // Add other intake mappings as needed
    };
  
    const intakeYear = intakeYearMap[intake] || 2023; // Default to 2023 if not found
    const intakeMonth = 1; // Default to January (Month 1)
  
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
  
    // Determine the student's study year
    let studyYear = currentYear - intakeYear;
  
    // If the current month is before the student's intake month in the year, subtract 1 from the study year
    if (currentMonth < intakeMonth) {
      studyYear -= 1;
    }
  
    // Add 1 to the study year because students start their study year at intakeYear
    studyYear += 1;
  
    // Determine the semester based on the student's study year and current month
    let semester = '';
    if (studyYear === 1) {
      semester = currentMonth <= 6 ? 'Semester 01' : 'Semester 02';
    } else if (studyYear === 2) {
      semester = currentMonth <= 6 ? 'Semester 03' : 'Semester 04';
    } else if (studyYear === 3) {
      semester = currentMonth <= 6 ? 'Semester 05' : 'Semester 06';
    } else if (studyYear === 4) {
      semester = currentMonth <= 6 ? 'Semester 07' : 'Semester 08';
    }
    setStudyYear(studyYear)
    setSemester(semester)
  
    return { studyYear, semester };
  };
  
  
  

  // Function to fetch student data based on student ID
  const fetchStudentData = async (id) => {
    try {
      const studentsRef = ref(db, "students"); // Reference to the students node
      const snapshot = await get(studentsRef);
  
      if (snapshot.exists()) {
        const studentsData = snapshot.val();
        let foundStudent = null;
        let key = null;
  
        // Loop through all students and find the one with the matching student ID
        Object.entries(studentsData).forEach(([firebaseKey, student]) => {
          if (student.studentId === id) { // Compare student ID
            foundStudent = student;
            key = firebaseKey;
          }
        });
  
        if (foundStudent) {
          setStudentData(foundStudent); // Set student data to state
          console.log(foundStudent.intake)
          const { studyYear, semester } = calculateYearAndSemester(foundStudent.intake);
          console.log(studyYear, semester)
          fetchCoursesForSemester(studyYear, semester); // Fetch courses for the calculated year and semester
        } else {
          setError('Student not found');
          setStudentData(null);
        }
      } else {
        setError('No students data found');
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      setError('Error fetching student data');
    }
  };
  
  // Function to fetch courses based on study year and semester
  const fetchCoursesForSemester = async (studyYear, semester) => {
    try {
      const coursesRef = ref(db, `Course/${studyYear}/${semester}`); // Reference to courses based on year and semester
      const snapshot = await get(coursesRef);

      if (snapshot.exists()) {
        setCourses(snapshot.val());
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // const handleSearch = () => {
  //   if (newId) {
  //     fetchStudentData(studentId);
  //   } else {
  //     setError('Please enter a student ID');
  //   }
  // };

  const handleSearch = () => {
    if (studentId) {
      const formattedId = studentId.toUpperCase(); // Convert user input to uppercase
      fetchStudentData(formattedId);
    } else {
      setError("Please enter a student ID");
    }
  };
  

 

  return (
        <div className={styles.studentPage}>
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
      <div className={styles.searchContent}>
      <h2>Search Student and View Courses</h2>

      {/* Search bar */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Enter student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display errors */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Display student data and courses */}
      {studentData && (
        <div>
          <h2>Student: {studentData.name}</h2>
          <h3>Intake: {studentData.intake}</h3>
          <h4>Current Year: {studyYear}</h4>
          <h4>Current Semester: {semester}</h4>

          {/* Display courses in a table */}
          <table className={styles.courseTable} border={1}>
            <thead>
              <tr className={styles.courseTableTR}>
                <th>Module Code</th>
                <th>Module Name</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.code}>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No courses available for this semester</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}</div>
            <footer className={styles.footer}>
        <p>&copy; 2025 Department of Software Engineering</p>
      </footer>
    </div>
  );
};

export default StudentCourses;
