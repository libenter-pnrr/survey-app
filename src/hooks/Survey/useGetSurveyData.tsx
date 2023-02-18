import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import {
  getSurveyDataById,
  updateSurveyData,
} from "@application/api/SurveyData";
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

  const saveSurveyData = (data) => {
    const request = {
      token: keycloak.token,
      surveyId: id,
      data: data.formData,
    };

    setIsLoading(true);
    updateSurveyData(request)
      .then(() => {
        console.log("Survey data saved");
        setSurveyData({
          ...surveyData,
          surveyData: data.formData,
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, surveyData, saveSurveyData };
};
