import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import FullScreenLoader from "@application/components/FullScreenLoader";
import { useGetSurveyData } from "@hooks/Survey/useGetSurveyData";
import ProjectInfo from "@application/components/Project/ProjectInfo";

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

  const { isLoading, surveyData, saveSurveyData } = useGetSurveyData(surveyId);

  return (
    <Container
      sx={{
        marginTop: 3,
      }}
    >
      {surveyData && <ProjectInfo id={surveyData.cupId} />}
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
              onSubmit={(data) => saveSurveyData(data)}
              children={disabled}
            />
          </Box>
        </Card>
      )}
    </Container>
  );
};

export default SurveyDataUpdate;
