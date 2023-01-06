import { ISurveyReducerState } from "./ISurveyReducerState";

export interface ISurveyContext extends ISurveyReducerState {
  dispatch: React.Dispatch<any>;
}
