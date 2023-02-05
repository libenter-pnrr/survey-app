import { IProjectContext } from "@application/models/Project/IProjectContext";
import { ProjectContextProps } from "@application/models/Project/ProjectContextProps";
import {
  ProjectReducer,
  projectReducerInitialState,
} from "@reducers/Project/ProjectReducer";
import React from "react";

const ProjectContext = React.createContext<IProjectContext>({
  openFilter: false,
  loading: false,
  filter: {
    customer: "",
    cup: "",
    regions: [],
    search: "",
    provinces: [],
  },
  rows: [],
  pageCount: 0,
  dispatch: () => {},
});

export const ProjectProvider = ({ children }: ProjectContextProps) => {
  const [state, dispatch] = React.useReducer(
    ProjectReducer,
    projectReducerInitialState
  );

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default function useProjectContext(): IProjectContext {
  const context = React.useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
}
