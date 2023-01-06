import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Box,
  DialogContentText,
} from "@mui/material";
import useSurveyContext from "@contexts/SurveyContext";
import { DELETE, SET_TO_DELETE } from "@reducers/Survey/actions";
import { Warning } from "@mui/icons-material";

const DeleteSurveyDialog = () => {
  const { dispatch, toDelete } = useSurveyContext();

  const handleDelete = () => {
    dispatch({ type: DELETE });
  };

  const handleCloseDelete = () => {
    dispatch({ type: SET_TO_DELETE, payload: null });
  };

  return (
    <Dialog open={toDelete !== null} onClose={handleCloseDelete}>
      <DialogTitle>Confermi l'operazione?</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Warning color="error" fontSize="large" />
        </Box>
        <DialogContentText>
          Sei sicuro di voler eliminare questo item dal questionario?
          L'operazione non è reversibile.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCloseDelete} color="secondary">
          Annulla
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          autoFocus
        >
          Elimina
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSurveyDialog;
