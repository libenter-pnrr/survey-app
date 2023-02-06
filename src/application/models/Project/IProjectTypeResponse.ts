import IResponse from "@application/api/Reponse/IResponse";
import { ProjectType } from "./ProjectType";

export default interface IProjectTypeResponse
  extends IResponse<ProjectType[]> {}
