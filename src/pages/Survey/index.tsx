import React from "react";
import { Box } from "@mui/material";
import { formElements } from "./data/components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SET_QUESTIONS } from "../../reducers/Survey/actions";
import Sidebar from "@components/Survey/Sidebar";
import useSurveyContext from "../../contexts/SurveyContext";
import SurveyBuilder from "@components/Survey/SurveyBuilder";
import copy from "../../common/utils/copy";
import reorder from "../../common/utils/reorder";
import SurveyToolbar from "@components/Survey/SurveyToolbar";
import UpdateSurveyItemDialog from "@components/Survey/UpdateSurveyItemDialog";

const Survey = () => {
  const { questions, display, dispatch } = useSurveyContext();

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
      <UpdateSurveyItemDialog />
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
            {display === "preview" && <div>Preview</div>}
          </Box>
        </DragDropContext>
      </Box>
    </React.Fragment>
  );
};

export default Survey;
