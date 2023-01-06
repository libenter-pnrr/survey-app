import { ISurveyReducerState } from "@application/models/Survey/ISurveyReducerState";
import {
  SET_DESCRIPTION,
  SET_QUESTIONS,
  SET_TITLE,
  SET_DISPLAY,
  SET_TO_DELETE,
  DELETE,
  SET_TO_UPDATE,
  UPDATE,
  DUPLICATE,
} from "@reducers/Survey/actions";

export const surveyReducerInitialState: ISurveyReducerState = {
  title: "",
  description: "",
  toDelete: null,
  toUpdate: null,
  display: "builder",
  questions: [],
};

export const SurveyReducer = (
  state = surveyReducerInitialState,
  action: any
) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_DISPLAY:
      return { ...state, display: action.payload };
    case SET_QUESTIONS:
      return { ...state, questions: action.payload };
    case SET_TO_DELETE:
      return { ...state, toDelete: action.payload };
    case DELETE: {
      const newQuestions = state.questions.filter(
        (question) => question.id !== state.toDelete
      );
      return { ...state, questions: newQuestions, toDelete: null };
    }
    case DUPLICATE: {
      console.log(action.payload);
      return { ...state, questions: [...state.questions, action.payload] };
    }
    case SET_TO_UPDATE:
      return { ...state, toUpdate: action.payload };
    case UPDATE: {
      const newQuestions = [];
      for (const question of state.questions) {
        if (question.id === action.payload.id) {
          Object.assign(question, action.payload);
        }

        newQuestions.push(question);
      }

      return { ...state, questions: newQuestions, toUpdate: null };
    }
  }

  return state;
};
