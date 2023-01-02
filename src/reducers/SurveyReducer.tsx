import {
  SET_DESCRIPTION,
  SET_QUESTIONS,
  SET_TITLE,
} from "../pages/Survey/data/actions";
import { ISurveyReducerState } from "../pages/Survey/types";

export const surveyReducerInitialState: ISurveyReducerState = {
  title: "",
  description: "",
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
    case SET_QUESTIONS:
      return { ...state, questions: action.payload };
  }

  return state;
};
