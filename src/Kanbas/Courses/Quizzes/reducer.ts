import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuizToState: (state, { payload: quiz }) => {
            const newQuiz: any = {
                name: quiz.name,
                course: quiz.course,
                availableFrom: quiz.availableFrom,
                availableUntil: quiz.availableUntil,
                dueDate: quiz.dueDate,
                noq: quiz.noq,
                points: quiz.points,
                published: quiz.published,
                quizType: quiz.quizType,
                assignmentGroup: quiz.assignmentGroup,
                shuffleAnswers: quiz.shuffleAnswers,
                timeLimit: quiz.timeLimit,
                timeLimitEntry:quiz.timeLimitEntry,
                allowMultipleAttempts:quiz.allowMultipleAttempts,
                multipleAttempts: quiz.multipleAttempts,
                showCorrectedAnswers:quiz.showCorrectedAnswers,
                accessCode: quiz.accessCode,
                accessCodeEntry: quiz.accessCode,
                oneQuestionAtATime: quiz.oneQuestionAtATime,
                webCamRequired: quiz.webCamRequired,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuizFromState: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId);
        },
        selectQuiz: (state, action) => {
            state.quizzes = action.payload;
        },
        updateQuizToState: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
        },
        // editquiz: (state, { payload: quizId }) => {
        //     state.quizzes = state.quizzes.map((m: any) =>
        //         m._id === quizId ? { ...m, editing: true } : m
        //     ) as any;
        // },
    },
});
export const { addQuizToState, setQuizzes, selectQuiz, deleteQuizFromState,updateQuizToState } =
    quizzesSlice.actions;
export default quizzesSlice.reducer;