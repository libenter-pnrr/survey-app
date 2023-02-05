import { IProjectReducerState } from "@reducers/Project/ProjectReducer";

export interface IProjectContext extends IProjectReducerState {
  dispatch: React.Dispatch<any>;
}
