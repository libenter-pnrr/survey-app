import IResponse from "@application/api/Reponse/IResponse";

export type ProjectDataDetails = {
  id: string;
  code: string;
  regionCode?: string;
  regionAcronym?: string;
  thematicDescription?: string;
  cupType?: string;
  natureDescription?: string;
  templateDescription?: string;
  state?: string;
  provinceName?: string;
  regionName?: string;
  provinceAcronym?: string;
  istat?: string;
  town?: string;
  fiscalCode?: string;
  description?: string;
  sectorName?: string;
  subsectoreName?: string;
  customerName?: string;
  customerCategory?: string;
  customerSubcategoryDescription?: string;
  category?: string;
  generationDate?: string;
  cupCost?: number;
  cupFunded?: number;
  status?: string;
};

export interface IGetProjectInfoResponse
  extends IResponse<ProjectDataDetails> {}

export type SaveSurveyDataResponse = {
  id: string;
};

export default interface ISaveSurveyDataResponse
  extends IResponse<SaveSurveyDataResponse> {}
