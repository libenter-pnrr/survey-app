import { useEffect, useState } from "react";
import { getSurveys } from "@application/api/Survey";
import { IGetSurveysResponse } from "@application/models/Survey/ICreateSurveyPayload";
import { useKeycloak } from "@react-keycloak/web";

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<IGetSurveysResponse[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const {
    keycloak: { token },
  } = useKeycloak();

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = () => {
    setLoading(true);
    getSurveys(token)
      .then((res: IGetSurveysResponse) => setSurveys(res))
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  };

  return {
    surveys,
    isLoading,
    error,
    loadSurveys,
  };
};
