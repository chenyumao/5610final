import { IoMdArrowDropdown } from "react-icons/io";
import QuizzesScreenControlButtons from "./QuizzesScreenControlButtons";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as client from "../client";
import { deleteQuizFromState, setQuizzes } from "../reducer";
import { MdNoteAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { format } from 'date-fns';

export default function QuizzesScreen() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [contextMenuQuizId, setContextMenuQuizId] = useState<string | null>(null);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    const EditQuiz = (quizId: string) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
    }
    const removeQuiz = async (quizId: string) => {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuizFromState(quizId));
    }
    const handlePublishStatus = async (quizId: string) => {
        await client.updateQuizPublishStatus(quizId);
        fetchQuizzes();
    }
    const formatDate = (date: string) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return date;
        }
        return format(parsedDate, 'MMM d \'at\' h:mmaaa');
    };

    const getAvailabilityStatus = (availableFrom: string, availableUntil: string) => {
        const currentDate = new Date();
        const availableFromDate = new Date(availableFrom);
        const availableUntilDate = new Date(availableUntil);

        if (isNaN(availableFromDate.getTime())) {
            return 'Invalid Available From Date';
        }

        if (isNaN(availableUntilDate.getTime())) {
            return 'Invalid Available Until Date';
        }

        if (currentDate > availableUntilDate) {
            return 'Closed';
        } else if (currentDate >= availableFromDate && currentDate <= availableUntilDate) {
            return 'Available';
        } else if (currentDate < availableFromDate) {
            return `Not available until ${format(availableFromDate, 'MMM d \'at\' h:mmaaa')}`;
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (currentUser.role === 'FACULTY') {
        return (
            <div id="wd-quizzes-screen">
                <QuizzesScreenControlButtons />
                <ul id="wd-quizzes-screen-body" className="list-group rounded-0">
                    <li className="wd-quizzes-screen-body list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <IoMdArrowDropdown className="me-2 fs-3" />
                            Assignment Quizzes
                        </div>

                        <ul className="wd-quizzes list-group rounded-0">
                            {quizzes
                                .map((quiz: any) => (
                                    <li className="wd-quiz list-group-item p-3 ps-1">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-1">
                                                <MdNoteAlt className="me-2 fs-3 text-success" />
                                            </div>
                                            <div className="col-10">
                                                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} key={quiz._id} className="text-decoration-none">
                                                    <span className="wd-quiz-span fw-bold text-dark"
                                                        style={{ textDecoration: 'none' }}>
                                                        {quiz.name}
                                                    </span>
                                                </Link>
                                                <br />

                                                <span className="wd-quiz-due-date text-muted text-secondary">
                                                    <span className="text-dark"
                                                    >{getAvailabilityStatus(quiz.availableFrom, quiz.availableUntil)}</span>
                                                    <span> | </span>
                                                    <span className="text-dark"
                                                    >Due: </span>
                                                    <span>{formatDate(quiz.dueDate)}</span>
                                                    <span> | </span>
                                                    <span>{quiz.points} pts</span>
                                                    <span> | </span>
                                                    <span>{quiz.noq} Questions</span>
                                                </span>

                                            </div>
                                            <div className="col-1">
                                                <FaCheckCircle className={quiz.published ? 'text-success me-1 fs-5' : 'text-gray me-1 fs-5'} />
                                                <IoEllipsisVertical className="fs-4" onClick={() => setContextMenuQuizId(quiz._id)} />
                                                {contextMenuQuizId === quiz._id && (
                                                    <div className="quiz-context-menu bg-white border rounded shadow-sm p-2 z-1" style={{ position: 'absolute' }}>
                                                        <button className="btn btn-link text-start w-100" onClick={() => EditQuiz(quiz._id)}>Edit</button>
                                                        <button className="btn btn-link text-start w-100 text-danger" onClick={() => removeQuiz(quiz._id)}>Delete</button>
                                                        <button className="btn btn-link text-start w-100" onClick={() => handlePublishStatus(quiz._id)}>
                                                            {quiz.published ? 'Unpublish' : 'Publish'}
                                                        </button>
                                                        <button className="btn btn-link text-start w-100" onClick={() => setContextMenuQuizId(null)}>Close</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </li>
                                ))}
                        </ul>
                    </li>
                </ul>

            </div>
        );
    } else {
        return (
            <div id="wd-quizzes-screen">
                <QuizzesScreenControlButtons />
                <ul id="wd-quizzes-screen-body" className="list-group rounded-0">
                    <li className="wd-quizzes-screen-body list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <IoMdArrowDropdown className="me-2 fs-3" />
                            Assignment Quizzes
                        </div>

                        <ul className="wd-quizzes list-group rounded-0">
                            {quizzes
                                .filter((q: any) => q.published === true)
                                .map((quiz: any) => (
                                    <li className="wd-quiz list-group-item p-3 ps-1">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-1">
                                                <MdNoteAlt className="me-2 fs-3 text-success" />
                                            </div>
                                            <div className="col-11">
                                                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} key={quiz._id} className="text-decoration-none">
                                                    <span className="wd-quiz-span fw-bold text-dark"
                                                        style={{ textDecoration: 'none' }}>
                                                        {quiz.name}
                                                    </span>
                                                </Link>
                                                <br />
                                                <span className="wd-quiz-due-date text-muted text-secondary">
                                                    <span className="text-dark"
                                                    >{getAvailabilityStatus(quiz.availableFrom, quiz.availableUntil)}</span>
                                                    <span> | </span>
                                                    <span className="text-dark"
                                                    >Due: </span>
                                                    <span>{formatDate(quiz.dueDate)}</span>
                                                    <span> | </span>
                                                    <span>{quiz.points} pts</span>
                                                    <span> | </span>
                                                    <span>{quiz.noq} Questions</span>
                                                </span>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                        </ul>
                    </li>
                </ul>

            </div>
        );
    }
}