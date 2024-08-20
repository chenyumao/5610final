import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../client";
import { addQuizToState, updateQuizToState } from '../reducer';
import { format } from 'date-fns';
type Quiz = {
    quizType: string;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: boolean;
    timeLimitEntry: number;
    attemptLimit: number;
    allowMultipleAttempts: boolean;
    showCorrectedAnswers: boolean;
    accessCode: boolean;
    accessCodeEntry: number;
    oneQuestionAtATime: boolean;
    webCamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    _id: string;
    name: string;
    course: string;
    questions: any[];
    description?: string;
    points?: number;
    dueDate?: string;
    availableFrom?: string;
    availableUntil?: string;
    published: boolean;


};


export default function QuizDetailsEditor() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatDateForInput = (dateString = '') => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return format(date, "yyyy-MM-dd'T'HH:mm");
    };
    const existingQuiz = quizzes.find((q: { _id: string | undefined; }) => q._id === qid);
    const [quiz, setQuiz] = useState<Quiz>({
        quizType: existingQuiz?.quizType || 'Graded Quiz',
        assignmentGroup: existingQuiz?.assignmentGroup || 'Quizzes',
        shuffleAnswers: existingQuiz?.shuffleAnswers ?? true,
        timeLimit: existingQuiz?.timeLimit ?? true,
        timeLimitEntry: existingQuiz?.timeLimitEntry || 20,
        attemptLimit: existingQuiz?.attemptLimit || 1,
        allowMultipleAttempts: existingQuiz?.allowMultipleAttempts ?? false,
        showCorrectedAnswers: existingQuiz?.showCorrectedAnswers ?? false,
        accessCode: existingQuiz?.accessCode ?? false,
        accessCodeEntry: existingQuiz?.accessCodeEntry || 0,
        oneQuestionAtATime: existingQuiz?.oneQuestionAtATime ?? true,
        webCamRequired: existingQuiz?.webCamRequired ?? false,
        lockQuestionsAfterAnswering: existingQuiz?.lockQuestionsAfterAnswering ?? false,
        _id: existingQuiz?._id || new Date().getTime().toString(),
        name: existingQuiz?.name || "unnamed quiz",
        course: existingQuiz?.course || cid!,
        questions: existingQuiz?.questions || [],
        description: existingQuiz?.description || '',
        points: existingQuiz?.points || 0,
        dueDate: formatDateForInput(existingQuiz?.dueDate),
        availableFrom: formatDateForInput(existingQuiz?.availableFrom),
        availableUntil: formatDateForInput(existingQuiz?.availableUntil),
        published: existingQuiz?.published ?? false,
    });


    const createQuiz = async (quiz: any) => {
        await client.createQuiz(quiz);
        //dispatch(addQuizToState(quiz));
    }
    const saveQuiz = async (quiz: any) => {
        const updatedQuiz = await client.updateQuiz(quiz);
        dispatch(updateQuizToState(quiz));
    }
    const [errors, setErrors] = useState({
        title: false,
        dueDate: false,
        availableFrom: false,
        availableUntil: false,
    });

    const handleSave = () => {
        const newErrors = {
            title: !quiz.name.trim(),
            dueDate: !quiz.dueDate,
            availableFrom: !quiz.availableFrom,
            availableUntil: !quiz.availableUntil,
        };

        setErrors(newErrors);

        const questionErrors = quiz.questions.map(question => {
            const baseErrors = {
                title: !question.title.trim(),
                points: question.points <= 0,
                questionText: !question.questionText.trim(),
            };

            switch (question.type) {
                case 'multiple-choice':
                    return {
                        ...baseErrors,
                        choices: question.choices.length === 0,
                        correctAnswer: !question.choices.some((choice: { isCorrect: boolean }) => choice.isCorrect),
                    };
                case 'true-false':
                    return baseErrors;
                case 'fill-in-blank':
                    return {
                        ...baseErrors,
                        correctAnswers: question.correctAnswers.length === 0 || question.correctAnswers.some((answer: { text: string }) => !answer.text.trim()),
                    };
                default:
                    return baseErrors;
            }
        });

        const hasQuestionErrors = questionErrors.some(errors => Object.values(errors).some(error => error));

        if (Object.values(newErrors).some(error => error) || hasQuestionErrors) {
            // If there are any errors, don't save
            alert("Please correct all errors before saving.");
            return;
        }

        const totalPoints = quiz.questions.reduce((sum, question) => sum + (question.points || 0), 0);
        const updatedQuiz = { ...quiz, points: totalPoints };

        if (qid && existingQuiz) {
            saveQuiz(quiz);
        } else {
            createQuiz(quiz);
        }
        navigate(`/Kanbas/Courses/${cid}/quizzes`);
    };

    const cancel = async (quiz: any) => {
        //await client.updateQuiz(quiz);
        //dispatch(updateQuizInState(quiz));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setQuiz((prevQuiz: any) => ({
            ...prevQuiz,
            [id]: type === 'checkbox' ? checked : value
        }));
    };


    return (
        <div className="wd-quiz-details-editor">
            <div className="wd-quiz-details-editor-nav">
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <a className="nav-link active"
                            href="#details" data-bs-toggle="tab">Details</a>
                    </li>
                    <li className="nav-item ms-2">
                        <a className="nav-link" href="#questions" data-bs-toggle="tab">Questions</a>
                    </li>
                </ul>
            </div>

            <div className="tab-content mt-3">
                <div className="tab-pane fade show active" id="details">
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fw-bold">
                                Quiz Title
                            </label>
                            <input
                                id="title"
                                value={quiz.name}
                                onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                                className="form-control"
                                placeholder="Unnamed Quiz"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Quiz Instructions
                        </label>
                        <textarea className="form-control" id="description" rows={7} cols={30} />
                    </div>

                    <div className="row mb-3 align-items-left">
                        <div className="col-md-4 text-end">
                            <label className="form-label float-end" htmlFor="wd-quiz-type">Quiz Type</label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group d-flex ">
                                <select className="form-select" id="wd-quiz-type" value={quiz.quizType}
                                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                                    <option value={"Graded Quiz "}>Graded Quiz </option>
                                    <option value={"Practice Quiz"}>Practice Quiz </option>
                                    <option value={"Graded Survey"}>Graded Survey</option>
                                    <option value={"Ungraded Survey"}>Ungraded Survey</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3 align-items-left">
                        <div className="col-md-4 text-end">
                            <label className="form-label float-end" htmlFor="wd-points">Points</label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group d-flex ">
                                <input type="number" className="form-control" id="wd-points" value={`${quiz && quiz.points}`}
                                    onChange={handleChange} />
                                <br />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3 align-items-left">
                        <div className="col-md-4 text-end">
                            <label className="form-label float-end" htmlFor="wd-assignment-group">Assignment Group</label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group d-flex ">
                                <select className="form-select" id="wd-assignment-group" value={quiz.assignmentGroup}
                                    onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                                    <option selected>Quizzes</option>
                                    <option value="Quizzes">Quizzes</option>
                                    <option value="Exams">Exams</option>
                                    <option value="Assignments">Assignments</option>
                                    <option value="Project">Project</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-1 ">
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                            <label className="form-label me-0 col-md-6">
                                <b>Options</b>
                            </label>
                        </div>
                    </div>


                    <div className="row mb-1">
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                            <input
                                className="form-check-input me-2 col-md-6"
                                type="checkbox"
                                checked={quiz.shuffleAnswers === true}
                                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                                id="shuffleAnswers" />
                            <label className="form-check-label mb-0 col-md-6"
                                htmlFor="shuffleAnswers">
                                Shuffle Answers
                            </label>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex align-items-center mb-2">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={quiz.timeLimit === true}
                                    onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked })}
                                    id="timeLimit"
                                />
                                <label className="form-check-label me-4"
                                    htmlFor="timeLimit">
                                    Time Limit
                                </label>
                                <input
                                    id="timeLimitEntry"
                                    type="number"
                                    value={quiz.timeLimitEntry}
                                    onChange={(e) => setQuiz({ ...quiz, timeLimitEntry: Number(e.target.value) })}
                                    className="form-control me-2"
                                    defaultValue={20}
                                    style={{ width: '80px' }}
                                />
                                <label htmlFor="timeLimitEntry">
                                    Minutes
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex align-items-center mb-2">
                                <input className="form-check-input me-2"
                                    type="checkbox"
                                    checked={quiz.allowMultipleAttempts === true}
                                    onChange={(e) => setQuiz({ ...quiz, allowMultipleAttempts: e.target.checked })}
                                    id="allowMultipleAttempts" />

                                <label className="form-check-label me-4"
                                    htmlFor="allowMultipleAttempts">
                                    Allow Multiple Attempts
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <input className="form-check-input me-2"
                                type="checkbox"
                                checked={quiz.showCorrectedAnswers === true}
                                onChange={(e) => setQuiz({ ...quiz, showCorrectedAnswers: e.target.checked })}
                                id="showCorrectedAnswers"
                            />
                            <label className="form-check-label" htmlFor="showCorrectedAnswers">
                                Show Corrected Answers
                            </label>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex align-items-center mb-2">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={quiz.accessCode === true}
                                    onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.checked })}
                                    id="accessCode" />
                                <label className="form-check-label me-5" htmlFor="accessCode">
                                    Access Code
                                </label>
                                <input
                                    type="number"
                                    id="accessCodeEntry"
                                    className="form-control me-2 w-50"
                                    value={quiz.accessCodeEntry}
                                    onChange={(e) => setQuiz({ ...quiz, accessCodeEntry: Number(e.target.value) })}
                                    placeholder="Enter Access Code" />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 ">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <input className="form-check-input me-2"
                                type="checkbox"
                                checked={quiz.oneQuestionAtATime}
                                onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                                id="oneQuestionAtATime" />
                            <label className="form-check-label" htmlFor="oneQuestionAtATime">
                                One Question at a Time
                            </label>
                        </div>
                    </div>
                    <div className="row mb-3 ">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <input className="form-check-input me-2"
                                type="checkbox"
                                checked={quiz.webCamRequired === true}
                                onChange={(e) => setQuiz({ ...quiz, webCamRequired: e.target.checked })}
                                id="webCamRequired" />
                            <label className="form-check-label" htmlFor="webCamRequired">
                                WebCam Required
                            </label>
                        </div>
                    </div>
                    <div className="row mb-3 mb-4 ">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <input className="form-check-input me-2"
                                type="checkbox"
                                checked={quiz.lockQuestionsAfterAnswering === true}
                                onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                                id="lockQuestionsAfterAnswering"
                            />
                            <label className="form-check-label" htmlFor="lockQuestionsAfterAnswering">
                                Lock Questions After Answering
                            </label>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-md-4 ">
                            <label htmlFor="dueDate" className="form-label float-end">
                                Assign
                            </label>
                        </div>
                        <div className="col-md-6 border border-gray rounded-3 p-2">
                            <div className="mb-3">
                                <label htmlFor="dueDate" className="form-label">
                                    Due Date
                                </label>
                                <input
                                    id="dueDate"
                                    type="datetime-local"
                                    value={quiz.dueDate}
                                    onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="availableFrom" className="form-label">
                                        Available From
                                    </label>
                                    <input
                                        id="availableFrom"
                                        type="datetime-local"
                                        value={quiz.availableFrom}
                                        onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="availableUntil" className="form-label">
                                        Available Until
                                    </label>
                                    <input
                                        id="availableUntil"
                                        type="datetime-local"
                                        value={quiz.availableUntil}
                                        onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <br /><br /><br /><br />
                    </div>
                </div>
                <div className="tab-pane fade" id="questions">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="d-flex mb-3">
                                    <button
                                        className="btn btn-secondary"
                                    // onClick={() => addNewQuestion(selectedQuestionType)}
                                    >
                                        + New Question
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-center mt-4">
                    <button onClick={cancel} className="btn btn-secondary me-2">Cancel</button>
                    <button onClick={handleSave} className="btn btn-primary btn-danger">Save</button>
                </div>

            </div>

        </div >
    )
}