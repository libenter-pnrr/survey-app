import {
  ICreateSurveyPayload,
  IGetSurveysResponse,
  IGetSurveyPayload,
  IGetSurveyResponse,
  IUpdateSurveyPayload,
} from "@application/models/Survey/ICreateSurveyPayload";
import { Survey } from "@application/models/Survey/Survey";
import { http } from "../http";

const createSurvey = async (
  payload: ICreateSurveyPayload
): Promise<{ id: string }> => {
  const { token, ...rest } = payload;
  const { data } = await http.post(`/survey`, rest, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data.id;
};

const updateSurvey = async (payload: IUpdateSurveyPayload): Promise<null> => {
  const { token, id, ...rest } = payload;
  return await http.patch(`/survey/${id}`, rest, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const getSurveys = async (token: string): Promise<Survey[]> => {
  const { data }: IGetSurveysResponse = await http.get(`/survey`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data as Survey[];
};

const getSurveyById = async (
  payload: IGetSurveyPayload
): Promise<IGetSurveyResponse> => {
  const { token, id } = payload;
  const { data } = await http.get(`/survey/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const deleteSurvey = async (
  payload: IGetSurveyPayload
): Promise<null | Error> => {
  const { token, id } = payload;
  return await http.delete(`/survey/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export { createSurvey, getSurveys, getSurveyById, updateSurvey, deleteSurvey };
