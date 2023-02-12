import { useEffect, useState } from "react";
import { getSurveyById } from "@application/api/Survey";
import { useKeycloak } from "@react-keycloak/web";
import { IGetSurveyResponse } from "@application/models/Survey/ICreateSurveyPayload";

export const useGetSurvey = (id: string) => {
  const { keycloak } = useKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [survey, setSurvey] = useState<IGetSurveyResponse | null>(null);

  useEffect(() => {
    if (!id) {
      setSurvey(null);
      return;
    }

    getSurvey();
  }, [id, keycloak.token]);

  const getSurvey = () => {
    setIsLoading(true);
    getSurveyById({
      token: keycloak.token,
      id,
    })
      .then((response: IGetSurveyResponse) => {
        setSurvey(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, survey };
};
