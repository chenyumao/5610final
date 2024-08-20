import { Link } from "react-router-dom";
export default function FacultyDashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (course: any) => void;
            updateCourse: () => void;
        }
) {
    return (
        <div id="wd-faculty-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h5>New Course
                <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
                <button className="btn btn-warning float-end me-2"
                    id="wd-add-new-course-click"
                    onClick={updateCourse} > Update </button>
            </h5>
            <input value={course.name} className="form-control mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <textarea value={course.description} className="form-control"
                onChange={(e) => setCourse({ ...course, description: e.target.value })} />
            <hr />
            <h2 id="wd-dashboard-published">Published Courses</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div className="wd-dashboard-course col mt-4 mb-4" style={{ width: "300px" }}>

                            <Link to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none" >
                                <div className="card rounded-3 overflow-hidden">
                                    <img src="/images/reactjs.jpg" height="{160}" />
                                    <div className="card-body">
                                        <span className="wd-dashboard-course-link"
                                            style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                                            {course.name}
                                        </span>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {course.description}
                                        </p>
                                        <Link to={`/Kanbas/Courses/${course.number}/Home`} className="btn btn-primary">Go</Link>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }} className="btn btn-danger float-end"
                                            id="wd-delete-course-click">
                                            Delete
                                        </button>

                                        <button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}
                                            className="btn btn-warning me-2 float-end" >
                                            Edit
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