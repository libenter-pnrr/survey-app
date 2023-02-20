import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSurveys } from "@hooks/Survey/useSurveys";
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
import { useGetSurvey } from "@hooks/Survey/useGetSurvey";
import { saveSurveyData } from "@application/api/SurveyData";
import { useApplicationContext } from "@contexts/ApplicationProvider";
import FullScreenLoader from "@application/components/FullScreenLoader";
import { useKeycloak } from "@react-keycloak/web";
import ProjectInfo from "@application/components/Project/ProjectInfo";
import { SaveSurveyDataResponse } from "@application/models/Project/IGetProjectInfoResponse";

function transformErrors(errors) {
  return errors.map((error) => {
    if (error.name === "required") {
      error.message = "La risposta a questa domanda è obbligatoria";
    }
    return error;
  });
}

const SurveyData = () => {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const { gloabalLoader, setGlobalLoader, notify } = useApplicationContext();
  const { isLoading, surveys } = useSurveys();
  const [selectedSurvey, setSelectedSurvey] = React.useState<string>("");
  const { isLoading: loadingSurvey, survey } = useGetSurvey(selectedSurvey);

  const handleSurveyData = (data) => {
    const request = {
      token: keycloak.token,
      cupId: projectId,
      surveyId: selectedSurvey,
      schema: data.schema,
      uiSchema: data.uiSchema,
      data: data.formData,
    };

    setGlobalLoader(true);
    saveSurveyData(request)
      .then((reponse: SaveSurveyDataResponse) => {
        notify("Dati questionario salvati correttamente", "success");
        navigate(`/survey-data/${reponse.id}/update`);
      })
      .catch((e) => {
        console.log(e);
        notify(
          "Errore durante il salvataggio dei dati del questionario",
          "error"
        );
      })
      .finally(() => {
        setGlobalLoader(false);
      });
  };

  return (
    <Container
      sx={{
        marginTop: 3,
      }}
    >
      {gloabalLoader && <FullScreenLoader />}
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <FormControl fullWidth>
              <InputLabel id="select-survey-label">
                Seleziona un questionario
              </InputLabel>
              <Select
                labelId="select-survey-label"
                fullWidth
                label="Seleziona un questionario"
                value={selectedSurvey}
                onChange={(e) => setSelectedSurvey(e.target.value)}
                renderValue={(value) => {
                  const survey: Survey = surveys.find((s) => s.id === value);
                  return (
                    <React.Fragment>
                      <Typography>{survey?.title}</Typography>
                      <Typography variant="caption">
                        {survey?.description}
                      </Typography>
                    </React.Fragment>
                  );
                }}
              >
                {surveys.map((survey) => (
                  <MenuItem key={survey.id} value={survey.id}>
                    <Typography>{survey.title}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Card>
      <ProjectInfo id={projectId} />
      {loadingSurvey && (
        <Box
          sx={{
            marginTop: 3,
            marginBottom: 3,
            display: "flex",
            justifyContent: "center",
            height: 200,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      {!loadingSurvey && survey && (
        <React.Fragment>
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
                schema={survey.schema}
                uiSchema={Object.assign(survey.uiSchema, {
                  "ui:submitButtonOptions": {
                    submitText: "Salva Questionario",
                  },
                })}
                transformErrors={transformErrors}
                showErrorList={false}
                onSubmit={(data) => handleSurveyData(data)}
              />
            </Box>
          </Card>
        </React.Fragment>
      )}
    </Container>
  );
};

export default SurveyData;
