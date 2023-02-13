import IResponse from "@application/api/Reponse/IResponse";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export type SurveyDataById = {
  id: string;
  cupId: string;
  surveyId: string;
  surveySchema: RJSFSchema;
  surveyUiSchema: UiSchema;
  surveyData: any;
};

export interface IGetSurveyDataResponse extends IResponse<SurveyDataById> {}
