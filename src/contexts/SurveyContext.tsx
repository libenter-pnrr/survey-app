import React, { useReducer } from "react";
import {
  SurveyReducer,
  surveyReducerInitialState,
} from "../reducers/Survey/SurveyReducer";
import { ISurveyContext } from "@application/models/Survey/ISurveyContext";
import { SurveyContextProps } from "@application/models/Survey/SurveyContextProps";

const SurveyContext = React.createContext<ISurveyContext>({
  title: "",
  description: "",
  display: "builder",
  questions: [],
  dispatch: () => {},
} as ISurveyContext);

export const SurveyProvider = ({ children }: SurveyContextProps) => {
  const [
    { title, description, questions, display, toDelete, toUpdate },
    dispatch,
  ] = useReducer(SurveyReducer, surveyReducerInitialState);

  return (
    <SurveyContext.Provider
      value={{
        title,
        description,
        questions,
        dispatch,
        display,
        toDelete,
        toUpdate,
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
