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
import { createSurvey } from "@application/api/Survey";
import { useKeycloak } from "@react-keycloak/web";
import { useApplicationContext } from "@contexts/ApplicationProvider";

const CreateSurvey = () => {
  const { questions, display, dispatch, title, description } =
    useSurveyContext();
  const { keycloak } = useKeycloak();
  const { setGlobalLoader, notify } = useApplicationContext();

  const handleCreateSurvey = async () => {
    const { schema, uiSchema } = buildFormSchema(title, description, questions);

    try {
      setGlobalLoader(true);
      await createSurvey({
        token: keycloak.token,
        title,
        description,
        schema,
        uiSchema,
      });
      notify("Questionario creato correttamente", "success");
    } catch (e) {
      console.log(e);
      notify(e?.response?.data?.message, "error");
    } finally {
      setGlobalLoader(false);
    }
  };

  return (
    <React.Fragment>
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
          <Save onClick={handleCreateSurvey} />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default CreateSurvey;
