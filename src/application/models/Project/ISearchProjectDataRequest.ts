import IRequest from "@application/api/Request/IRequest";

export default interface ISearchProjectDataRequest extends IRequest {
  customer: string;
  cup?: string;
  regions?: string[];
  search?: string;
  provinces?: string[];
  offset: number;
  limit: number;
}
