import { FormElementProps } from "@application/models/Survey/FormElementProps";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export type FormSchemaResponse = {
  schema: RJSFSchema;
  uiSchema: UiSchema;
};

const buildFormSchema = (
  title: string,
  description: string,
  elements: FormElementProps[]
): FormSchemaResponse => {
  const schema: RJSFSchema = {
    type: "object",
    title,
    description,
    required: elements
      .filter((element) => element.required)
      .map((element) => element.id),
    properties: {},
  };

  const uiSchema: UiSchema = {};

  elements.forEach((element) => {
    schema.properties[element.id] = element.schema;
    uiSchema[element.id] = element.uiSchema;
  });

  return { schema, uiSchema };
};

export default buildFormSchema;
