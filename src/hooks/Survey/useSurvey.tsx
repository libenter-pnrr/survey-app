import { getSurveys } from "@application/api/Survey";
import { IGetSurveysResponse } from "@application/models/Survey/ICreateSurveyPayload";
import { useKeycloak } from "@react-keycloak/web";
import { useQuery } from "@tanstack/react-query";

const useSurvey = () => {
  const { keycloak } = useKeycloak();
  return useQuery<IGetSurveysResponse, Error>(
    ["surveys", "surveys-id"],
    async () => {
      return getSurveys(keycloak.token);
    },
    {
      retry: 2,
      suspense: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useSurvey;
