import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type FormElementProps = {
  id: string;
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  schema: any;
  uiSchema?: any;
};

export interface ISurveyReducerState {
  title: string;
  description: string;
  display: string;
  questions: FormElementProps[];
}

export interface ISurveyContext extends ISurveyReducerState {
  dispatch: React.Dispatch<any>;
}

export type SurveyContextProps = {
  children: React.ReactNode;
};
