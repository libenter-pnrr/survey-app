import React from "react";
import { Box, Toolbar, Typography, ButtonGroup, Button } from "@mui/material";
import { formElements } from "./data/components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { SET_QUESTIONS } from "./data/actions";
import Sidebar from "./Sidebar";
import useSurveyContext from "../../contexts/SurveyContext";
import SurveyBuilder from "./SurveyBuilder";
import copy from "../../common/utils/copy";
import reorder from "../../common/utils/reorder";

const Survey = () => {
  const { questions, dispatch } = useSurveyContext();

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
    <div>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="button">Crea Questionario</Typography>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Costruisci</Button>
          <Button>Anteprima</Button>
        </ButtonGroup>
        <Box />
      </Toolbar>
      <Box sx={{ display: "flex", height: "calc(100vh - 133px)" }}>
        <DragDropContext onDragEnd={(e: DropResult) => onDragEnd(e)}>
          <Sidebar />
          <SurveyBuilder />
        </DragDropContext>
      </Box>
    </div>
  );
};

export default Survey;
