import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import {
  getSurveyDataById,
  updateSurveyData,
} from "@application/api/SurveyData";
import { SurveyDataById } from "@application/models/SurveyData/SurveyData";
import { useApplicationContext } from "@contexts/ApplicationProvider";

export const useGetSurveyData = (id: string) => {
  const { keycloak } = useKeycloak();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<SurveyDataById | null>(null);
  const { notify } = useApplicationContext();

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
        setSurveyData({
          ...surveyData,
          surveyData: data.formData,
        });
        notify("Dati questionario salvati correttamente", "success");
      })
      .catch((e) => {
        console.log(e);
        notify(e?.response?.data?.message, "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, surveyData, saveSurveyData };
};
