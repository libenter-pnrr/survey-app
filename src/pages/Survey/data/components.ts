import { Notes, RadioButtonChecked, TextFields } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { v4 as uuid } from "uuid";

export type FormElementProps = {
  id: string;
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  schema: any;
  uiSchema?: any;
};

export const formElements: FormElementProps[] = [
  {
    id: uuid(),
    title: "Text Input",
    icon: TextFields,
    schema: {
      type: "string",
      title: "Text Input",
    },
  },
  {
    id: uuid(),
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
    id: uuid(),
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
