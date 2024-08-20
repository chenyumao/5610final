import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
export interface KanbasState {
    modulesReducer: {
      modules: any[];
      module: any;
    };
    assignmentReducer: {
      assignments: any[];
      assignment: any;
      tempAssignment: any;
    };
    quizReducer: {
      quizzes: any[];
      quiz: any;
      tempQuiz: any;
    };
  }
const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        accountReducer,
        quizzesReducer,
    },
});
export default store;