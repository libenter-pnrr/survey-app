import IRequest from "@application/api/Request/IRequest";

export default interface ISearchSurveyDataRequest extends IRequest {
  regions?: string[];
  search?: string;
  provinces?: string[];
  offset: number;
  limit: number;
}
