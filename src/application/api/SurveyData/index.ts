import ISearchSurveyDataRequest from "@application/models/SurveyData/ISearchSurveyDataRequest";
import ISearchSurveyDataResponse from "@application/models/SurveyData/ISearchSurveyDataResponse";
import { http } from "../http";

export const getSurveyData = async ({
  token,
  regions,
  search,
  provinces,
  offset,
  limit,
}: ISearchSurveyDataRequest): Promise<ISearchSurveyDataResponse> => {
  return await http.post(
    "/survey-data/search",
    {
      regions,
      search,
      provinces,
      offset,
      limit,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
