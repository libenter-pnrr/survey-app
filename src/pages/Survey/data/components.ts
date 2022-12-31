import { Notes, RadioButtonChecked, TextFields } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type FormElementProps = {
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  schema: any;
  uiSchema?: any;
};

export const formElements: FormElementProps[] = [
  {
    title: "Text Input",
    icon: TextFields,
    schema: {
      type: "string",
      title: "Text Input",
    },
  },
  {
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
