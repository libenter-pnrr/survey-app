import { RJSFSchema, UiSchema } from "@rjsf/utils";

export interface Survey {
  id: string;
  title: string;
  description: string;
  schema?: RJSFSchema;
  uiSchema?: UiSchema;
}
