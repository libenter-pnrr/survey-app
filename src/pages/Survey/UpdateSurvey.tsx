import React from "react";
import { Box, Fab } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Sidebar from "@application/components/Survey/Sidebar";
import useSurveyContext from "../../contexts/SurveyContext";
import SurveyBuilder from "@application/components/Survey/SurveyBuilder";
import SurveyToolbar from "@application/components/Survey/SurveyToolbar";
import { Save } from "@mui/icons-material";
import SurveyPreview from "@application/components/Survey/SurveyPreview";
import buildFormSchema from "@common/utils/buildFormSchema";
import { onDragEnd } from "@common/utils/drag";
import { useParams } from "react-router-dom";
import { useGetSurvey } from "@hooks/Survey/useGetSurvey";
import FullScreenLoader from "@application/components/FullScreenLoader";
import buildQuestion from "@common/utils/buildQuestion";
import {
  SET_DESCRIPTION,
  SET_QUESTIONS,
  SET_TITLE,
} from "@reducers/Survey/actions";
import { updateSurvey } from "@application/api/Survey";
import { useKeycloak } from "@react-keycloak/web";

const UpdateSurvey = () => {
  const { questions, display, dispatch, title, description } =
    useSurveyContext();
  const { id } = useParams<{ id: string }>();
  const { isLoading, survey } = useGetSurvey(id);
  const { keycloak } = useKeycloak();

  React.useEffect(() => {
    if (!isLoading && survey) {
      dispatch({
        type: SET_TITLE,
        payload: survey.title,
      });
      dispatch({
        type: SET_DESCRIPTION,
        payload: survey.description,
      });
      dispatch({
        type: SET_QUESTIONS,
        payload: buildQuestion(survey),
      });
    }
  }, [isLoading, survey]);

  const handleUpdateSurvey = async () => {
    const { schema, uiSchema } = buildFormSchema(title, description, questions);
    await updateSurvey({
      id: survey.id,
      token: keycloak.token,
      title,
      description,
      schema,
      uiSchema,
    });
  };

  return (
    <React.Fragment>
      {isLoading && <FullScreenLoader />}
      <SurveyToolbar />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 133px)",
        }}
      >
        <DragDropContext
          onDragEnd={(e: DropResult) => onDragEnd(e, dispatch, questions)}
        >
          <Sidebar />
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            {display === "builder" && <SurveyBuilder />}
            {display === "preview" && <SurveyPreview />}
          </Box>
        </DragDropContext>
      </Box>
      {title && questions.length > 0 && (
        <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 30 }}>
          <Save onClick={handleUpdateSurvey} />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default UpdateSurvey;
