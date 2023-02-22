import { SurveyData } from "@application/models/SurveyData/ISearchSurveyDataResponse";
import {
  CLOSE_FILTER,
  OPEN_FILTER,
  RESET_FILTER,
  SET_FILTER,
  SET_LOADING,
  SET_RESULTS,
  SET_TO_DELETE,
} from "./actions";

export interface ISurveyDataFilter {
  customer: string;
  cup?: string;
  regions?: string[];
  search?: string;
  provinces?: string[];
  projectTypes?: string[];
}

export interface ISurveyDataReducerState {
  openFilter: boolean;
  loading: boolean;
  toDelete?: {
    id: string;
    title: string;
    cup: string;
  } | null;
  filter: ISurveyDataFilter;
  rows: SurveyData[];
  pageCount: number;
}

export const surveyDataReducerInitialState: ISurveyDataReducerState = {
  openFilter: false,
  loading: false,
  toDelete: null,
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

export const SurveyDataReducer = (
  state = surveyDataReducerInitialState,
  action: any
): ISurveyDataReducerState => {
  if (action.type === OPEN_FILTER) {
    return { ...state, openFilter: true };
  }

  if (action.type === CLOSE_FILTER) {
    return { ...state, openFilter: false };
  }

  if (action.type === SET_FILTER) {
    return { ...state, filter: action.payload };
  }

  if (action.type === SET_TO_DELETE) {
    return { ...state, toDelete: action.payload };
  }

  if (action.type === RESET_FILTER) {
    return { ...state, filter: surveyDataReducerInitialState.filter };
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
