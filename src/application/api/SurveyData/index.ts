import ICreateSurveyDataRequest from "@application/models/SurveyData/ICreateSurveyDataRequest";
import ISearchSurveyDataRequest from "@application/models/SurveyData/ISearchSurveyDataRequest";
import ISearchSurveyDataResponse, {
  ISearchSurveyData,
} from "@application/models/SurveyData/ISearchSurveyDataResponse";
import { http } from "../http";

export const getSurveyData = async ({
  token,
  customer,
  cup,
  regions,
  search,
  provinces,
  projectTypes,
  offset,
  limit,
}: ISearchSurveyDataRequest): Promise<ISearchSurveyData> => {
  const response: ISearchSurveyDataResponse = await http.post(
    "/survey-data/search",
    {
      customer,
      cup,
      regions,
      search,
      provinces,
      projectTypes,
      offset,
      limit,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as ISearchSurveyData;
};

export const saveSurveyData = async ({
  token,
  surveyId,
  cupId,
  schema,
  uiSchema,
  data,
}: ICreateSurveyDataRequest): Promise<null> => {
  return await http.post(
    "/survey-data",
    {
      surveyId,
      cupId,
      schema,
      uiSchema,
      data,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
