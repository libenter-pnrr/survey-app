import { ISurveyDataReducerState } from "@reducers/Survey/SurveyDataReducer";

export interface ISurveyDataContext extends ISurveyDataReducerState {
  dispatch: React.Dispatch<any>;
}
