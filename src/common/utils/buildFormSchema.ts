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
  const schema: RJSFSchema = new Object({
    type: "object",
    title,
    description,
    required: [],
    properties: {},
  }) as RJSFSchema;

  const uiSchema: UiSchema = new Object({}) as UiSchema;

  for (const element of elements) {
    schema.properties[element.id] = element.schema;
    uiSchema[element.id] = element.uiSchema;
    if (element.required) {
      schema.required.push(element.id);
    }
  }

  return { schema, uiSchema };
};

export default buildFormSchema;
