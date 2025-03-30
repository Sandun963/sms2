'use client';
import React from 'react';
import styles from '../student/Student.module.css'; // Importing CSS for styling
import Link from "next/link";
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebaseConfig';
import { useRouter } from "next/navigation";
import Logout from "../components/Logout";

const CourseModules = () => {
    // State to store course data
    const [coursesData, setCoursesData] = useState({});
    const router = useRouter();
  
    // Function to fetch course data from Firebase
    const fetchCourseData = async () => {
      try {
        const coursesRef = ref(db, 'Course'); // Reference to the Course node
        const snapshot = await get(coursesRef);
        
        if (snapshot.exists()) {
          setCoursesData(snapshot.val()); // Set the data to the state
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
  
    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
      fetchCourseData();
    }, []);

    const handleStudentClick = () => {
        router.push("/course/studentcourse");
  
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


        <div className={styles.courseMod}>
        <button className={styles.studentButton} onClick={handleStudentClick}>
              Check current Studies
            </button>
        <h1>Course Modules</h1>

        {Object.entries(coursesData).map(([year, semesters]) => (
          <div key={year} className={styles.yearSection}>
            <h2>Year {year}</h2>
            {Object.entries(semesters).map(([semester, modules]) => (
              <div key={semester} className={styles.semesterSection}>
                <h3>{semester}</h3>
                <table className={styles.moduleTable}>
                  <thead>
                    <tr>
                      <th>Module Code</th>
                      <th>Module Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr key={module.code}>
                        <td>{module.code}</td>
                        <td>{module.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2025 Department of Software Engineering</p>
      </footer></div>
    );
  };
  
  export default CourseModules;

// // export default Courses;
// 'use client'; 
// import { useEffect } from 'react';
// import { ref, set } from 'firebase/database';
// import { db } from '../firebaseConfig';  // Make sure to import your Firebase config

// const SaveCoursesToFirebase = () => {
//   // Course data
//   const coursesData = {
//     1: {
//       "Semester 01": [
//         { code: "CS11012", name: "Fundamentals of Programming" },
//         { code: "CS11021", name: "Programming Laboratory" },
//         { code: "CS11032", name: "Foundation of Computer Science" },
//         { code: "COE11013", name: "Computer Systems Architecture" },
//         { code: "CS11042", name: "Fundamentals of Databases" },
//         { code: "SE11012", name: "Software Development Methodologies" },
//         { code: "CM11033", name: "Probability and Statistics" },
//         { code: "CM11102", name: "Mathematics for Computing" },
//         { code: "DL1132", name: "English: Basic Study Skills for CS/SE/CE" },
//       ],
//       "Semester 02": [
//         { code: "CS12012", name: "Web Development" },
//         { code: "CS12023", name: "Object Oriented Programming" },
//         { code: "CS12033", name: "Computer Networks" },
//         { code: "CS12041", name: "Creative Media Tools" },
//         { code: "SE12012", name: "Software Analysis and Modelling" },
//         { code: "CM12052", name: "Discrete Mathematics" },
//         { code: "COE12241", name: "Fundamentals of Electronics" },
//         { code: "COE12992", name: "Collaborative Hardware Project" },
//         { code: "DL2142", name: "English: Advance Study Skills for CS/SE/CE" },
//       ]
//     },
//     2: {
//       "Semester 03": [
//         { code: "CS21012", name: "Operating Systems" },
//         { code: "CS21022", name: "Data Structures and Algorithms" },
//         { code: "CS21032", name: "Advanced Object Oriented Programming" },
//         { code: "CS21042", name: "Advanced Computer Networks and Wireless Communication" },
//         { code: "CS21052", name: "Advanced Web Development" },
//         { code: "CS22993", name: "Group Project in Software Development" },
//         { code: "SE21012", name: "Requirement Engineering" },
//         { code: "CM21032", name: "Statistical Distributions and Inference" },
//         { code: "CM21102", name: "Calculus" },
//         { code: "MF2112", name: "Principles of Management" },
//         { code: "DL3152", name: "Writing and Speaking Skills" },
//         { code: "MS2044", name: "Military Studies III" },
//         { code: "MS3032", name: "Strategic Defence Studies" },
//       ],
//       "Semester 04": [
//         { code: "CS22012", name: "Advanced Data Structures and Algorithms" },
//         { code: "CS22023", name: "Artificial Intelligence" },
//         { code: "CS22993", name: "Group Project in Software Development" },
//         { code: "SE22013", name: "Software Project Management" },
//         { code: "SE22022", name: "Software Architecture" },
//         { code: "COE22032", name: "Computer Interfacing and Microprocessors" },
//         { code: "CM22112", name: "Numerical Methods" },
//         { code: "DL4162", name: "Research Writing Skills" },
//       ]
//     },
//     3: {
//       "Semester 05": [
//         { code: "CS31012", name: "Essentials of Computer Law" },
//         { code: "CS31022", name: "Research Methodology" },
//         { code: "CS31032", name: "Mobile Computing" },
//         { code: "CS31042", name: "Computer and Network Security" },
//         { code: "CS31052", name: "Bioinformatics" },
//         { code: "CS31062", name: "UX and UI Engineering" },
//         { code: "CS31072", name: "Advanced Databases Techniques" },
//       ],
//       "Semester 06": [
//         { code: "CS32012", name: "Computer Graphics and Visualization" },
//         { code: "CS32022", name: "Automata Theory" },
//         { code: "CS32032", name: "Complex Systems and Agent Technology" },
//         { code: "CS32042", name: "Information Security" },
//         { code: "CS32082", name: "Natural Language Processing" },
//         { code: "CS32092", name: "Machine Learning" },
//         { code: "CS32102", name: "Distributed Systems" },
//       ]
//     },
//     4: {
//       "Semester 07": [
//         { code: "CS41092", name: "Digital Forensics" },
//         { code: "CS41112", name: "Deep Learning" },
//         { code: "CS41122", name: "Location Based Services" },
//         { code: "CS41132", name: "Interactive Media and Game Development" },
//         { code: "SE41012", name: "Deployment Engineering" },
//         { code: "SE42999", name: "Individual Research Project" },
//       ],
//       "Semester 08": [
//         { code: "SE42999", name: "Individual Research Project" },
//         { code: "SE42986", name: "Industrial Training" },
//       ]
//     }
//   };

//   // Function to save course data to Firebase
//   const saveCourseData = () => {
//     // Loop through each year
//     Object.keys(coursesData).forEach((year) => {
//       const yearRef = ref(db, `Course/${year}`);
      
//       // Loop through each semester in the year
//       const semesters = coursesData[year];
//       Object.keys(semesters).forEach((semester) => {
//         // Create a reference for each semester under the year
//         const semesterRef = ref(db, `Course/${year}/${semester}`);
        
//         // Set the course data for each semester
//         set(semesterRef, semesters[semester])
//           .then(() => {
//             console.log(`Successfully saved courses for ${semester} of Year ${year}`);
//           })
//           .catch((error) => {
//             console.error(`Error saving data for ${semester} of Year ${year}:`, error);
//           });
//       });
//     });
//   };

//   // Use useEffect to run the saveCourseData function once when the component is mounted
//   useEffect(() => {
//     saveCourseData();
//   }, []); // Empty dependency array ensures this runs only once after the component mounts

//   return (
//     <div>
//       <h2>Saving Courses Data to Firebase...</h2>
//     </div>
//   );
// };

// export default SaveCoursesToFirebase;
