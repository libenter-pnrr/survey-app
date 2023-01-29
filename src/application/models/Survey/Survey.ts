import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { FormElementProps } from "./FormElementProps";

export interface Survey {
  id: string;
  title: string;
  description: string;
  schema?: RJSFSchema;
  uiSchema?: UiSchema;
  questions?: FormElementProps[];
}
