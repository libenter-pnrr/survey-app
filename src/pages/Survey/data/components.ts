import { Notes, RadioButtonChecked, TextFields } from "@mui/icons-material";
import { FormElementProps } from "../types";

export const formElements: FormElementProps[] = [
  {
    id: "1",
    title: "Text Input",
    icon: TextFields,
    schema: {
      type: "string",
      title: "Text Input",
    },
  },
  {
    id: "2",
    title: "Text Area",
    icon: Notes,
    schema: {
      type: "string",
      title: "Text Area",
    },
    uiSchema: {
      "ui:widget": "textarea",
    },
  },
  {
    id: "3",
    title: "Radio Select",
    icon: RadioButtonChecked,
    schema: {
      type: "string",
      title: "Radio Select",
      enum: ["Option 1", "Option 2", "Option 3"],
    },
    uiSchema: {
      "ui:widget": "radio",
    },
  },
];
