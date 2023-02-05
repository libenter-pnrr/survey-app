import IResponse from "@application/api/Reponse/IResponse";
import { RegionType } from "./RegionType";

export interface IRegionResponse extends IResponse<RegionType[]> {}
