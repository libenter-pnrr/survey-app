import React from "react";
import { Box, Fab } from "@mui/material";
import { formElements } from "./data/components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SET_QUESTIONS } from "../../reducers/Survey/actions";
import Sidebar from "@application/components/Survey/Sidebar";
import useSurveyContext from "../../contexts/SurveyContext";
import SurveyBuilder from "@application/components/Survey/SurveyBuilder";
import copy from "../../common/utils/copy";
import reorder from "../../common/utils/reorder";
import SurveyToolbar from "@application/components/Survey/SurveyToolbar";
import { Save } from "@mui/icons-material";
import SurveyPreview from "@application/components/Survey/SurveyPreview";

const Survey = () => {
  const { questions, display, dispatch, title } = useSurveyContext();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case "FORM":
        dispatch({
          type: SET_QUESTIONS,
          payload: reorder(questions, source.index, destination.index),
        });
        break;
      case "ITEMS":
        dispatch({
          type: SET_QUESTIONS,
          payload: copy(formElements, questions, source, destination),
        });
        break;
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
        <DragDropContext onDragEnd={(e: DropResult) => onDragEnd(e)}>
          <Sidebar />
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            {display === "builder" && <SurveyBuilder />}
            {display === "preview" && <SurveyPreview />}
          </Box>
        </DragDropContext>
      </Box>
      {title && questions.length > 0 && (
        <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 30 }}>
          <Save />
        </Fab>
      )}
    </React.Fragment>
  );
};

export default Survey;
