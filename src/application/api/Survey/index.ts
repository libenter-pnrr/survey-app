"use strict";

import {
  ICreateSurveyPayload,
  IGetSurveysResponse,
} from "@application/models/Survey/ICreateSurveyPayload";
import { http } from "../http";

const createSurvey = async (payload: ICreateSurveyPayload): Promise<null> => {
  const { token, ...rest } = payload;
  return await http.post(`/survey`, rest, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const getSurveys = async (token: string): Promise<IGetSurveysResponse> => {
  const { data } = await http.get(`/survey`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { createSurvey, getSurveys };
