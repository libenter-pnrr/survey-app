import IRequest from "@application/api/Request/IRequest";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export default interface ICreateSurveyDataRequest extends IRequest {
  surveyId: string;
  cupId: string;
  schema?: RJSFSchema;
  uiSchema?: UiSchema;
  data?: any;
}
