import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { RJSFSchema, UiSchema } from "@rjsf/utils";

export type FormElementProps = {
  id: string;
  type:
    | "text"
    | "textarea"
    | "radio"
    | "number"
    | "checkbox"
    | "select"
    | "date"
    | "time"
    | "number"
    | "url"
    | "email";
  required?: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  schema: RJSFSchema;
  uiSchema?: UiSchema;
};
