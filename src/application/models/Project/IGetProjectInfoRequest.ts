import IRequest from "@application/api/Request/IRequest";

export default interface IGetProjectInfoRequest extends IRequest {
  id: string;
}
