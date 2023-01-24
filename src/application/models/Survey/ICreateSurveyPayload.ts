import IResponse from "@application/api/Reponse/IResponse";
import IRequest from "@application/api/Request/IRequest";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { Survey } from "./Survey";

export interface ICreateSurveyPayload extends IRequest {
  title: string;
  description: string;
  schema: RJSFSchema;
  uiSchema?: UiSchema;
}

export interface IGetSurveysResponse extends IResponse<Survey[]> {}
