import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { getSurveyDataById } from "@application/api/SurveyData";
import { SurveyDataById } from "@application/models/SurveyData/SurveyData";

export const useGetSurveyData = (id: string) => {
  const { keycloak } = useKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<SurveyDataById | null>(null);

  useEffect(() => {
    if (!id) {
      setSurveyData(null);
      return;
    }

    fetchData();
  }, [id, keycloak.token]);

  const fetchData = () => {
    setIsLoading(true);
    getSurveyDataById({
      token: keycloak.token,
      id,
    })
      .then((response: SurveyDataById) => {
        setSurveyData(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, surveyData };
};
