import IResponse from "@application/api/Reponse/IResponse";
import IRequest from "@application/api/Request/IRequest";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { FormElementProps } from "./FormElementProps";
import { Survey } from "./Survey";

export interface ICreateSurveyPayload extends IRequest {
  title: string;
  description: string;
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  questions?: FormElementProps[];
}

export interface IGetSurveyPayload extends IRequest {
  id: string;
}

export interface IUpdateSurveyPayload extends IRequest {
  surveyId: string;
  data?: any;
}

export interface IGetSurveyResponse extends ICreateSurveyPayload {
  id: string;
}

export interface IGetSurveysResponse extends IResponse<Survey[]> {}
