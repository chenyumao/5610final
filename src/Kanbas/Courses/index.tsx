import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import Grades from "./Grades";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizzesDetailsScreen from "./Quizzes/QuizzesDetailsScreen";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import QuizPreview from "./Quizzes/QuizzesPreview";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div id="wd-courses-body" className="row">
        <div className="col-md-2">
          <CoursesNavigation />
        </div>
        <div className="col-md-10">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="People/:uid" element={<PeopleTable />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizzesDetailsScreen />} />
            <Route path="Quizzes/:qid/Edit" element={<QuizDetailsEditor />} />
            <Route path="Quizzes/:quizId/preview" element={<QuizPreview/>}/>
          </Routes>
        </div>
      </div>
    </div>

  );
}
