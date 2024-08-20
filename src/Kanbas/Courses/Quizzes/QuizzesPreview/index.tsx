import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {KanbasState} from "../../../store";
import * as client from "../client";
import {selectQuiz, setQuizzes} from "../reducer";
import React, {useEffect} from "react";

function QuizPreview() {
  const {courseId, quizId} = useParams();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const quizzes = useSelector(
      (state: KanbasState) => state.quizReducer.quizzes
  );
  const tempQuiz = useSelector(
      (state: KanbasState) => state.quizReducer.tempQuiz
  );
  const quiz = useSelector(
      (state: KanbasState) => state.quizReducer.quiz
  );

  function shuffle(array: any[]) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  const PreviewMultipleChoiceQuestion = (question: any) => {
    let answerList = [question.choices_correct_answer, ...question.choices_possible_answers];
    if (quiz.shuffle_answers) {
      shuffle(answerList);
    }
    return (
        <div className="d-block">
          {answerList.map((answer: any, index: number) => (
              <div>
                <label>
                  <input type="radio" name={question._id}/>
                  {answer}
                </label>
              </div>
          ))}
        </div>
    );
  };
  const PreviewTrueFalseQuestion = (question: any) => {
    return (
        <div className="d-block">
          <div>
            <label>
              <input type="radio" name={question._id}/>
              True
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name={question._id}/>
              False
            </label>
          </div>
        </div>
    );
  };
  const PreviewMultipleBlanksQuestion = (question: any) => {
    return (
        <div className="d-block">
          {question.blanks_answer.map((answer: any, index: number) => (
              <div>
                <label>
                  Blank {answer.answer_id}
                  <input type="text"/>
                </label>
              </div>
          ))}
        </div>
    );
  };
  const dispatch = useDispatch();
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };
  const now = Date();
  useEffect(() => {
    if (quizId !== "new") {
      const currentQuiz = quizzes.find(
          (quiz: any) => quiz._id === quizId
      );
      if (currentQuiz) {
        dispatch(selectQuiz(currentQuiz));
      }
    } else {
      dispatch(selectQuiz(tempQuiz));
    }
  }, [quizId, quizzes, tempQuiz, dispatch]);
  return (
      <div>
        <h1>{quiz.quiz_name}</h1>
        <p>Started: {now}</p>
        <ul className="list-group">
          {quiz.questions.map((question: any, index: number) => (
              <li key={index} className="list-group-item">
                <h5>{question.text}</h5>
                <p>{question.points} pts</p>
                <p>{question.question}</p>
                {question.type === "Multiple Choice Question" ? PreviewMultipleChoiceQuestion(question) : question.type === "True False Question" ? PreviewTrueFalseQuestion(question) : PreviewMultipleBlanksQuestion(question)}
              </li>))}
        </ul>
        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`}
              className="btn btn-secondary float-end">
          Edit This Quiz
        </Link>
        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`}
              className="btn btn-secondary float-end">
          Back
        </Link>
      </div>
  );
}

export default QuizPreview;
