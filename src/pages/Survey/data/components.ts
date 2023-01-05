import { Notes, RadioButtonChecked, TextFields } from "@mui/icons-material";
import { FormElementProps } from "../types";

export const formElements: FormElementProps[] = [
  {
    id: "1",
    type: "text",
    icon: TextFields,
    schema: {
      type: "string",
      title: "Text Input",
      description: "Una descrizione del campo",
    },
  },
  {
    id: "2",
    type: "textarea",
    icon: Notes,
    schema: {
      type: "string",
      title: "Text Area",
      description: "Una descrizione del campo",
    },
    uiSchema: {
      "ui:widget": "textarea",
    },
  },
  {
    id: "3",
    type: "radio",
    icon: RadioButtonChecked,
    schema: {
      type: "string",
      title: "Radio Select",
      description: "Una descrizione del campo",
      enum: [1, 2, 3],
      enumNames: ["one", "two", "three"],
    },
    uiSchema: {
      "ui:widget": "radio",
    },
  },
];
