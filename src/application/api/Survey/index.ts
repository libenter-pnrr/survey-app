"use strict";

import { ICreateSurveyPayload } from "@application/models/Survey/ICreateSurveyPayload";
import { http } from "../http";

const createSurvey = async (payload: ICreateSurveyPayload): Promise<any> => {
  const { token, ...rest } = payload;
  const { data } = await http.post(`/survey`, rest, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { createSurvey };
