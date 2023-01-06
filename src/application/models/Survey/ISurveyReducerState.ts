import { FormElementProps } from "./FormElementProps";

export interface ISurveyReducerState {
  title: string;
  description: string;
  toDelete?: string;
  toUpdate?: string;
  display: string;
  questions: FormElementProps[];
}
