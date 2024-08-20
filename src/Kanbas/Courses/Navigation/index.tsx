import "./index.css";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { courses } from "../../Database";

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades","People"];
  return (
    <div id="wd-courses-navigation" style={{ width: 100 }}
      className="list-group fs-5 rounded-0 d-none d-md-block" >
        {links.map((link ) => (
          <Link key={link} to={`/Kanbas/Courses/${cid}/${link}`} 
          className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
            {link}
          </Link>
        ))}

    </div>
  );
}
