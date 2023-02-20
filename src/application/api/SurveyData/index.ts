import ISaveSurveyDataResponse, {
  SaveSurveyDataResponse,
} from "@application/models/Project/IGetProjectInfoResponse";
import {
  IUpdateSurveyDataPayload,
  IUpdateSurveyPayload,
} from "@application/models/Survey/ICreateSurveyPayload";
import ICreateSurveyDataRequest from "@application/models/SurveyData/ICreateSurveyDataRequest";
import ISearchSurveyDataRequest from "@application/models/SurveyData/ISearchSurveyDataRequest";
import ISearchSurveyDataResponse, {
  ISearchSurveyData,
} from "@application/models/SurveyData/ISearchSurveyDataResponse";
import {
  IGetSurveyDataResponse,
  SurveyDataById,
} from "@application/models/SurveyData/SurveyData";
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
  const response: ISaveSurveyDataResponse = await http.post(
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

  return response.data as SaveSurveyDataResponse;
};

export const updateSurveyData = async ({
  token,
  surveyId,
  data,
}: IUpdateSurveyDataPayload): Promise<null> => {
  return await http.patch(
    `/survey-data/${surveyId}`,
    {
      data,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSurveyDataById = async ({
  token,
  id,
}): Promise<SurveyDataById> => {
  const response: IGetSurveyDataResponse = await http.get(
    `/survey-data/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as SurveyDataById;
};
