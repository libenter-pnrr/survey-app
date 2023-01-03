import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useSurveyContext from "@contexts/SurveyContext";
import { SET_TO_UPDATE } from "@reducers/Survey/actions";

const UpdateSurveyItemDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [surveyItem, setSurveyItem] = React.useState(null); // [1
  const { dispatch, questions, toUpdate } = useSurveyContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (toUpdate === null) return;
    const item = questions.find((q) => q.id === toUpdate);
    setSurveyItem(item);
  }, [toUpdate]);

  const handleCloseDelete = () => {
    dispatch({ type: SET_TO_UPDATE, payload: null });
  };

  return (
    <Dialog
      open={toUpdate !== null}
      fullScreen={fullScreen}
      onClose={handleCloseDelete}
    >
      <DialogTitle>Aggiorna Elemento</DialogTitle>
      <DialogContent>Dialog Content {JSON.stringify(surveyItem)}</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCloseDelete} color="secondary">
          Annulla
        </Button>
        <Button variant="outlined" color="primary">
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateSurveyItemDialog;
