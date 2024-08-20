import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "./client"
export default function StudentDashboard(
    { courses }: { courses: any[] }
) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [selectedCourses,setSelectedCourses] = useState<any[]>([]);
    const fetchCourses = async () => {
        try {
            const courses = await client.getCourses();
            setSelectedCourses(courses);
        } catch (err: any) {
            console.error(err);
        }

    };
    const addCourseToUser = async (course:any) => {
        const updatedUser = {...currentUser,courses: [...currentUser.courses, course]};
        await client.updateUser(updatedUser);
        setSelectedCourses(currentUser.courses);
    };
    
    useEffect(() => { fetchCourses(); }, []);
    return (
        <div id="wd-student-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h5 id="wd-dashboard-courses-list-title">Courses List</h5><hr />
            <div className="mt-2" >
                <ul className="list-group rounded-0 ">
                    {courses.map((course) => (
                        <li className="list-group-item p-1 ps-1" key={course.number}>
                            {course.number} {course.name}
                            <button className="btn btn-danger float-end"
                            onClick={() => {
                                addCourseToUser(course);
                            }}
                                id="wd-student-add-course">
                                Add</button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {selectedCourses&&selectedCourses.map((selectCourse: any) => (
                        <div className="wd-dashboard-course col mt-4 mb-4" style={{ width: "300px" }}>

                            <Link to={`/Kanbas/Courses/${selectCourse.number}/Home`} className="text-decoration-none" >
                                <div className="card rounded-3 overflow-hidden">
                                    <img src="/images/reactjs.jpg" height="{160}" />
                                    <div className="card-body">
                                        <span className="wd-dashboard-course-link"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                                            {selectCourse.name}
                                        </span>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {selectCourse.description}
                                        </p>
                                        <Link to={`/Kanbas/Courses/${selectCourse.number}/Home`} className="btn btn-primary">Go</Link>
                                        <button 
                                        // onClick={(event) => {
                                        //     event.preventDefault();
                                        //     deleteCourse(selectCourse._id);
                                        // }} 
                                        className="btn btn-danger float-end"
                                            id="wd-delete-course-click">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}