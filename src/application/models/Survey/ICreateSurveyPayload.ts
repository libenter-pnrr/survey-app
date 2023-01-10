import IRequest from "@application/api/Request/IRequest";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export interface ICreateSurveyPayload extends IRequest {
  title: string;
  description: string;
  schema: RJSFSchema;
  uiSchema?: UiSchema;
}
