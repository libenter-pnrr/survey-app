import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Survey } from "@application/models/Survey/Survey";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useApplicationContext } from "@contexts/ApplicationProvider";
import FullScreenLoader from "@application/components/FullScreenLoader";
import { useKeycloak } from "@react-keycloak/web";
import { useGetSurveyData } from "@hooks/Survey/useGetSurveyData";

function transformErrors(errors) {
  return errors.map((error) => {
    if (error.name === "required") {
      error.message = "La risposta a questa domanda è obbligatoria";
    }
    return error;
  });
}

const SurveyDataUpdate = ({ disabled = false }: { disabled?: boolean }) => {
  const { surveyId } = useParams<{
    surveyId: string;
  }>();
  // const { keycloak } = useKeycloak();
  // const { gloabalLoader, setGlobalLoader } = useApplicationContext();
  const { isLoading, surveyData } = useGetSurveyData(surveyId);

  const handleSurveyData = (data) => {};

  return (
    <Container
      sx={{
        marginTop: 3,
      }}
    >
      {isLoading && <FullScreenLoader />}
      {!isLoading && surveyData && (
        <Card
          sx={{
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Form
              validator={validator}
              schema={surveyData.surveySchema}
              uiSchema={Object.assign(surveyData.surveyUiSchema, {
                "ui:submitButtonOptions": {
                  submitText: "Salva Questionario",
                },
              })}
              formData={surveyData.surveyData}
              transformErrors={transformErrors}
              showErrorList={false}
              disabled={disabled}
              onSubmit={(data) => handleSurveyData(data)}
            />
          </Box>
        </Card>
      )}
    </Container>
  );
};

export default SurveyDataUpdate;
