import React, { useReducer } from "react";
import {
  SurveyReducer,
  surveyReducerInitialState,
} from "../reducers/SurveyReducer";
import { ISurveyContext, SurveyContextProps } from "../pages/Survey/types";

const SurveyContext = React.createContext<ISurveyContext>({
  title: "",
  description: "",
  questions: [],
  dispatch: () => {},
} as ISurveyContext);

export const SurveyProvider = ({ children }: SurveyContextProps) => {
  const [{ title, description, questions }, dispatch] = useReducer(
    SurveyReducer,
    surveyReducerInitialState
  );

  return (
    <SurveyContext.Provider
      value={{
        title,
        description,
        questions,
        dispatch,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default function useSurveyContext(): ISurveyContext {
  const context = React.useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurveyContext must be used within a SurveyProvider");
  }
  return context;
}
