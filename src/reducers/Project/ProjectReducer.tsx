import { ProjectData } from "@application/models/Project/ISearchProjectDataResponse";
import {
  CLOSE_FILTER,
  OPEN_FILTER,
  RESET_FILTER,
  SET_FILTER,
  SET_LOADING,
  SET_RESULTS,
} from "./actions";

export interface IProjectFilter {
  customer: string;
  cup?: string;
  regions?: string[];
  search?: string;
  provinces?: string[];
}

export interface IProjectReducerState {
  openFilter: boolean;
  loading: boolean;
  filter: IProjectFilter;
  rows: ProjectData[];
  pageCount: number;
}

export const projectReducerInitialState: IProjectReducerState = {
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
};

export const ProjectReducer = (
  state = projectReducerInitialState,
  action: any
): IProjectReducerState => {
  if (action.type === OPEN_FILTER) {
    return { ...state, openFilter: true };
  }

  if (action.type === CLOSE_FILTER) {
    return { ...state, openFilter: false };
  }

  if (action.type === SET_FILTER) {
    return { ...state, filter: action.payload };
  }

  if (action.type === RESET_FILTER) {
    return { ...state, filter: projectReducerInitialState.filter };
  }

  if (action.type === SET_LOADING) {
    return { ...state, loading: action.payload };
  }

  if (action.type === SET_RESULTS) {
    return {
      ...state,
      ...{ rows: action.payload.rows, pageCount: action.payload.pageCount },
    };
  }

  return state;
};
