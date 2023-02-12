import IRequest from "@application/api/Request/IRequest";

export default interface ISearchSurveyDataRequest extends IRequest {
  customer?: string;
  cup?: string;
  regions?: string[];
  search?: string;
  provinces?: string[];
  projectTypes?: string[];
  offset: number;
  limit: number;
}
