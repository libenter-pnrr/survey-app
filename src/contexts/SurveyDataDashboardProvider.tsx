import { ISurveyDataContext } from "@application/models/Survey/ISurveyDataContext";
import { SurveyDataContextProps } from "@application/models/Survey/SurveyDataContextProps";
import {
  SurveyDataReducer,
  surveyDataReducerInitialState,
} from "@reducers/Survey/SurveyDataReducer";
import React from "react";

const SurveyDataContext = React.createContext<ISurveyDataContext>({
  openFilter: false,
  loading: false,
  filter: {
    customer: "",
    cup: "",
    regions: [],
    search: "",
    provinces: [],
    projectTypes: [],
  },
  rows: [],
  pageCount: 0,
  dispatch: () => {},
});

export const SurveyDataDashboardProvider = ({
  children,
}: SurveyDataContextProps) => {
  const [state, dispatch] = React.useReducer(
    SurveyDataReducer,
    surveyDataReducerInitialState
  );

  return (
    <SurveyDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SurveyDataContext.Provider>
  );
};

export default function useSuveryDataContext(): ISurveyDataContext {
  const context = React.useContext(SurveyDataContext);
  if (context === undefined) {
    throw new Error(
      "useSuveryDataContext must be used within a SurveyDataDashboardProvider"
    );
  }
  return context;
}
