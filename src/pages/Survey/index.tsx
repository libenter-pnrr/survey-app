import React from "react";
import {
  Button,
  Container,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  DialogActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import FullScreenLoader from "@application/components/FullScreenLoader";
import { MenuIcon } from "@application/components/MenuIcon";
import Table from "@application/components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useSurveys } from "@hooks/Survey/useSurveys";
import { Add, Warning } from "@mui/icons-material";
import { useKeycloak } from "@react-keycloak/web";
import { deleteSurvey } from "@application/api/Survey";

const SurveyDashboard = () => {
  const { surveys, isLoading, loadSurveys } = useSurveys();
  const [toDelete, setToDelete] = React.useState<{ id: string; title: string }>(
    { id: "", title: "" }
  );
  const { keycloak } = useKeycloak();

  const handleCloseDelete = () => {
    setToDelete({ id: "", title: "" });
  };

  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <MenuIcon
            options={[
              {
                label: "Configura",
                onClick: () => navigate(`/wizard/${original.id}/edit`),
              },
              {
                label: "Elimina",
                onClick: () =>
                  setToDelete({ id: original.id, title: original.title }),
              },
            ]}
          />
        ),
        width: 10,
        maxWidth: 50,
      },
      {
        Header: "Titolo",
        accessor: "title",
      },
      {
        Header: "Data di creazione",
        accessor: "creation_date",
        Cell: ({ value }) => {
          return new Date(value).toLocaleDateString();
        },
      },
      {
        Header: "Descrizione",
        accessor: "description",
      },
    ],
    []
  );

  const handleDelete = () => {
    deleteSurvey({
      id: toDelete.id,
      token: keycloak.token,
    })
      .then(() => {
        handleCloseDelete();
        loadSurveys();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      <Dialog open={toDelete?.id !== ""} onClose={handleCloseDelete}>
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
            Sei sicuro di voler eliminare il questionario{" "}
            <strong>{toDelete.title}</strong>? L'operazione non è reversibile.
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
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: (theme) => theme.spacing(1, 2),
          backgroundColor: (theme) => theme.palette.background.paper,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="button">
          Wizard di creazione questionari
        </Typography>
        <Tooltip title="Aggiungi Questionario">
          <IconButton onClick={() => navigate("/wizard/create")}>
            <Add sx={{ ml: 1 }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Container maxWidth={false} sx={{ py: 2 }}>
        {isLoading && <FullScreenLoader />}
        {!isLoading && surveys && <Table columns={columns} data={surveys} />}
      </Container>
    </React.Fragment>
  );
};

export default SurveyDashboard;
