import { Link } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import StudentDashboard from "./StudentDashboard";
export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
    }
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === 'FACULTY') {
    return (
      <FacultyDashboard
        courses={courses}
        course={course}
        setCourse={setCourse}
        addNewCourse={addNewCourse}
        deleteCourse={deleteCourse}
        updateCourse={updateCourse} />
    );
  } else {
    return (
      <StudentDashboard courses={courses} />
    );
  }
}
