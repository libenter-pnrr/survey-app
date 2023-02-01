import IResponse from "@application/api/Reponse/IResponse";

type SurveyData = {
  id: string;
  cup_code: string;
  survey_title: string;
  survey_description?: string;
  created_on: string;
  created_by: string;
  customer_id: string;
  customer_name: string;
  cup_status: string;
  cup_type?: string;
  cup_cost?: number;
  cup_funded?: number;
  region_code?: string;
  region_name?: string;
  region_acronym?: string;
  province_code?: string;
  province_name?: string;
  province_acronym?: string;
  thematic_code?: string;
  thematic_description?: string;
  type_code: string;
  type_description: string;
  state_name?: string;
};

export interface ISearchSurveyData {
  total: number;
  rows: SurveyData[];
}

export default interface ISearchSurveyDataResponse
  extends IResponse<ISearchSurveyData> {}
