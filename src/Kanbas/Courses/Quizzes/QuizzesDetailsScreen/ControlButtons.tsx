import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function ControlButtons({quiz}: {quiz:any}) {
    const navigate = useNavigate();
    return (
        <div>
            <button className="btn me-2 btn-secondary"
                onClick={() => navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Preview`)}>Preview</button>
            <button className="btn btn-secondary"
                onClick={() => navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Edit`)}>
                <FaPencilAlt className="me-2" />
                Edit
            </button>

        </div>
    );
}