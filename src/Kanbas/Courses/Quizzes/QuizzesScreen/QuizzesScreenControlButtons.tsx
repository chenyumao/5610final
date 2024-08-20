import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function QuizzesScreenControlButtons() {
    const navigate = useNavigate();
    return (
        <div id="wd-quizzes-screen-control-buttons">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="input-group" style={{ width: '300px' }}>
                    <span className="input-group-text">
                        <CiSearch />
                    </span>
                    <input
                        type="text"
                        id="wd-search-quiz"
                        className="form-control"
                        placeholder="Search for Quiz"
                    />
                </div>
                <div>
                    <button id="wd-add-quiz" className="btn btn-danger" onClick={() => navigate("newQuiz")}>
                        <FaPlus className="me-1" />
                        Quiz
                    </button>
                </div>
            </div>
            <hr />
        </div>
    );
}