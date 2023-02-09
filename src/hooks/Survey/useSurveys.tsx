import { useEffect, useState } from "react";
import { getSurveys } from "@application/api/Survey";
import { useKeycloak } from "@react-keycloak/web";
import { Survey } from "@application/models/Survey/Survey";

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
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
      .then((res: Survey[]) => setSurveys(res))
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
