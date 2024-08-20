import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ControlButtons from "./ControlButtons";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

export default function QuizzesDetailsScreen() {
    const { qid } = useParams();
    const quiz = useSelector((state: any) => state.quizzesReducer.quizzes.find((q: any) => q._id === qid));
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A'; // Handle cases where the date might be undefined or null

        const parsedDate = parseISO(dateString); // Parses the ISO string into a Date object

        if (isNaN(parsedDate.getTime())) {
            return dateString; // Return the original string if the date is invalid
        }

        return format(parsedDate, 'MMM d \'at\' h:mmaaa');
    };

    return (
        <div id="wd-quizzes-detail-screen">
            {currentUser && currentUser.role === "FACULTY" &&
                <div className="quizzes-detail-screen-faculty">
                    <div className="row">
                        <div className="col-6 text-end">
                            <ControlButtons quiz={quiz} />
                        </div>
                    </div>
                    <hr />
                </div>
            }

            <div className="quiz-details-title mb-4">
                <h3 className="col-md-4 text-dark font-weight-bold"><b>{quiz.name}</b></h3>
            </div>

            <div className="quiz-details-body">
                <div className="quiz-details-quizType row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Quiz Type</b></h5>
                    <p className="col-md-6">{quiz.quizType}</p>
                </div>
                <div className="quiz-details-points row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>points</b></h5>
                    <p className="col-md-6">{quiz.points}</p>
                </div>
                <div className="quiz-details-assignment-group row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Assignment Group</b></h5>
                    <p className="col-md-6">{quiz.assignmentGroup}</p>
                </div>
                <div className="quiz-details-shuffle-answers row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Shuffle Answers</b></h5>
                    <p className="col-md-6">{quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
                </div>
                <div className="quiz-details-shuffle-time-limit row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Time Limit</b></h5>
                    <p className="col-md-6">{quiz.timeLimit ? quiz.timeLimitEntry : 'Null'}</p>
                </div>
                <div className="quiz-details-multiple-attempts row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Multiple Attempts</b></h5>
                    <p className="col-md-6">{quiz.allowMultipleAttempts ? 'Yes' : 'No'}</p>
                </div>
                <div className="quiz-details-multiple-attempts-times row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Multiple Attempts Times</b></h5>
                    <p className="col-md-6">{quiz.allowMultipleAttempts ? quiz.MultipleAttempts : 'Null'}</p>
                </div>
                <div className="quiz-details-show-correct-answers row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Show Correct Answers</b></h5>
                    <p className="col-md-6">{quiz.showCorrectedAnswers ? 'Yes' : 'No'}</p>
                </div>
                <div className="quiz-access-code row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Access Code</b></h5>
                    <p className="col-md-6">{quiz.accessCode ? quiz.accessCodeEntry : 'Null'}</p>
                </div>
                <div className="quiz-one-question-a-time row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>One Question at a Time</b></h5>
                    <p className="col-md-6">{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
                </div>
                <div className="quiz-webcam-required row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Webcam Required</b></h5>
                    <p className="col-md-6">{quiz.webCamRequired ? 'Yes' : 'No'}</p>
                </div>
                <div className="quiz-lock-questions-after-answering row">
                    <h5 className="col-md-4 text-end text-dark font-weight-bold"><b>Lock Questions After Answering</b></h5>
                    <p className="col-md-6">{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</p>
                </div>
                <div className="table-container">
                    <table className="table w-100">
                        <thead>
                            <tr>
                                <td><b>Due</b></td>
                                <td><b>For</b></td>
                                <td><b>Available From</b></td>
                                <td><b>Until</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{formatDate(quiz.dueDate)}</td>
                                <td>{"Everyone"}</td>
                                <td>{formatDate(quiz.availableFrom)}</td>
                                <td>{formatDate(quiz.availableUntil)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div >
            {currentUser && currentUser.role === "STUDENT" &&
                <div className="quizzes-detail-screen-student">
                    <div className="row">
                        <div className="col-6 text-end">
                        <Link to={`/Kanbas/Courses`} className="btn btn-primary">Start Quiz</Link>
                        </div>
                    </div>
                    <hr />
                </div>
            }
        </div>
    );
}