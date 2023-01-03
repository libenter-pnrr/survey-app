import React from "react";
import { Box } from "@mui/material";
import { formElements } from "./data/components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SET_QUESTIONS } from "./data/actions";
import Sidebar from "./Sidebar";
import useSurveyContext from "../../contexts/SurveyContext";
import SurveyBuilder from "./SurveyBuilder";
import copy from "../../common/utils/copy";
import reorder from "../../common/utils/reorder";
import SurveyToolbar from "./SurveyToolbar";

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
      <Box sx={{ display: "flex", height: "calc(100vh - 133px)" }}>
        <DragDropContext onDragEnd={(e: DropResult) => onDragEnd(e)}>
          <Sidebar />
          {display === "builder" && <SurveyBuilder />}
          {display === "preview" && <div>Preview</div>}
        </DragDropContext>
      </Box>
    </React.Fragment>
  );
};

export default Survey;
