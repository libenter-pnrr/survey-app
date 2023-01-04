import { Notes, RadioButtonChecked, TextFields } from "@mui/icons-material";
import { FormElementProps } from "../types";

export const formElements: FormElementProps[] = [
  {
    id: "1",
    type: "text",
    title: "Text Input",
    icon: TextFields,
    schema: {
      type: "string",
      description: "Una descrizione del campo",
    },
  },
  {
    id: "2",
    type: "textarea",
    title: "Text Area",
    icon: Notes,
    schema: {
      type: "string",
      description: "Una descrizione del campo",
    },
    uiSchema: {
      "ui:widget": "textarea",
    },
  },
  {
    id: "3",
    type: "radio",
    title: "Radio Select",
    icon: RadioButtonChecked,
    schema: {
      type: "string",
      description: "Una descrizione del campo",
      enum: [1, 2, 3],
      enumNames: ["one", "two", "three"],
    },
    uiSchema: {
      "ui:widget": "radio",
    },
  },
];
