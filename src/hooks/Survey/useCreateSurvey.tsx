import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useKeycloak } from "@react-keycloak/web";
import { ICreateSurveyPayload } from "@application/models/Survey/ICreateSurveyPayload";
import { createSurvey } from "@application/api/Survey";
import IResponse from "@application/api/Reponse/IResponse";

const useCreateSurvey = () => {
  const toastId = React.useRef(null);
  const { keycloak } = useKeycloak();
  const client = useQueryClient();

  return useMutation(
    async ({ data }: { data: ICreateSurveyPayload }) => {
      toastId.current = toast.loading("Creazione questionario in corso..");
      return createSurvey({ ...data, token: keycloak.token });
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["surveys"]);
        toast.update(toastId.current, {
          render: "Questionario creato con successo",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      },
      onError: (error: AxiosError<IResponse>) => {
        toast.update(toastId.current, {
          render: `Errore nella creazione del questionario ${error.response.data.message}`,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      },
    }
  );
};

export default useCreateSurvey;
