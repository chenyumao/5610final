import { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

    const [module, setModule] = useState({
        id: "M101",
        name: "Introduction to Rocket Propulsion",
        description: "Basic principles of rocket propulsion and rocket engines.",
        course: "RS101",
    });
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <a id="wd-retrieve-modules" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <hr />

            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Assignment Title
            </a>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <hr />

            <h4>Modifying Assignment Properties</h4>
            <div className="mb-2">
                <a id="wd-update-assignment-title"
                    className="btn btn-primary float-end"
                    href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                    Update Title
                </a>
                <input className="form-control w-75" id="wd-assignment-title"
                    value={assignment.title} onChange={(e) =>
                        setAssignment({ ...assignment, title: e.target.value })} />
            </div>
            <div className="mb-2">
                <a id="wd-update-assignment-score"
                    className="btn btn-primary float-end"
                    href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                    Update Score
                </a>
                <input type="number" className="form-control w-75" id="wd-assignment-score"
                    value={assignment.score} onChange={(e) =>
                        setAssignment({ ...assignment, score: parseInt(e.target.value) })} />
            </div>
            <div className="mb-2">
                <a id="wd-update-assignment-completion"
                    className="btn btn-primary float-end"
                    href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                    Update Completion Status
                </a>
                <input type="checkbox" id="wd-assignment-completion"
                    checked={assignment.completed} onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })} />
                <label className="ms-2" htmlFor="wd-assignment-completion">Completed</label>
            </div>
            <hr />

            <h4>Modifying Module Properties</h4>
            <div className="mb-2">
                <a id="wd-update-module-name"
                    className="btn btn-primary float-end"
                    href={`${MODULE_API_URL}/name/${module.name}`}>
                    Update Name
                </a>
                <input className="form-control w-75" id="wd-module-name"
                    value={module.name} onChange={(e) =>
                        setModule({ ...module, name: e.target.value })} />
            </div>
            <div className="mb-2">
                <a id="wd-update-module-description"
                    className="btn btn-primary float-end"
                    href={`${MODULE_API_URL}/description/${module.description}`}>
                    Update Description
                </a>
                <input className="form-control w-75" id="wd-module-description"
                    value={module.description} onChange={(e) =>
                        setModule({ ...module, description: e.target.value })} />
            </div>


            <hr />
        </div>

    );
}