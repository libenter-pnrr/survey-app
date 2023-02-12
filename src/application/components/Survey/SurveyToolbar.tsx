import React from "react";
import { Box, Toolbar, Typography, ButtonGroup, Button } from "@mui/material";
import { SET_DISPLAY } from "../../../reducers/Survey/actions";
import useSurveyContext from "../../../contexts/SurveyContext";

const SurveyToolbar = () => {
  const { dispatch } = useSurveyContext();

  return (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: [1],
        backgroundColor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="button">Crea Questionario</Typography>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          onClick={() => dispatch({ type: SET_DISPLAY, payload: "builder" })}
        >
          Costruisci
        </Button>
        <Button
          onClick={() => dispatch({ type: SET_DISPLAY, payload: "preview" })}
        >
          Anteprima
        </Button>
      </ButtonGroup>
      <Box />
    </Toolbar>
  );
};

export default SurveyToolbar;
