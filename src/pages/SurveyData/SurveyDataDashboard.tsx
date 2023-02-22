import React from "react";
import { deleteSurveyData, getSurveyData } from "@application/api/SurveyData";
import { ISearchSurveyData } from "@application/models/SurveyData/ISearchSurveyDataResponse";
import { useKeycloak } from "@react-keycloak/web";
import ControlledTable from "@application/components/Table/ControlledTable";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, FilterList, Warning } from "@mui/icons-material";
import {
  OPEN_FILTER,
  SET_LOADING,
  SET_RESULTS,
  SET_TO_DELETE,
} from "@reducers/Survey/actions";
import useSuveryDataContext from "@contexts/SurveyDataDashboardProvider";
import FilterDrawer from "./FilterDrawer";
import { MenuIcon } from "@application/components/MenuIcon";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "@contexts/ApplicationProvider";

const SurveyDataDashboard = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const { loading, rows, pageCount, filter, dispatch, toDelete } =
    useSuveryDataContext();
  const { username, notify, setGlobalLoader } = useApplicationContext();
  // We'll start our table without any data
  const fetchIdRef = React.useRef(0);

  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        accessor: "id",
        Cell: ({ value, row }) => {
          const isCoordinator =
            keycloak.resourceAccess[keycloak.clientId].roles.includes(
              "admin"
            ) ||
            keycloak.resourceAccess[keycloak.clientId].roles.includes(
              "coordinator"
            );

          const options = [
            {
              label:
                row.values.created_by === username ? "Modifica" : "Dettagli",
              onClick: () => {
                if (row.values.created_by === username) {
                  navigate(`/survey-data/${value}/update`);
                } else {
                  navigate(`/survey-data/${value}/details`);
                }
              },
            },
            {
              label: "Elimina",
              onClick: () =>
                dispatch({
                  type: SET_TO_DELETE,
                  payload: {
                    id: value,
                    title: row.values.survey_title,
                    cup: row.values.cup_code,
                  },
                }),
            },
          ];

          if (!isCoordinator) {
            options.splice(1, 1);
          }

          return <MenuIcon options={options} />;
        },
      },
      {
        Header: "Codice Cup",
        accessor: "cup_code",
      },
      {
        Header: "Questionario",
        accessor: "survey_title",
      },
      {
        Header: "Descrizione",
        accessor: "survey_description",
      },
      {
        Header: "Creato il",
        accessor: "created_on",
      },
      {
        Header: "Creato da",
        accessor: "created_by",
      },
      {
        Header: "Cliente",
        accessor: "customer_name",
      },
      {
        Header: "Stato Cup",
        accessor: "cup_status",
      },
      {
        Header: "Tipologia Cup",
        accessor: "cup_type",
      },
      {
        Header: "Regione Cup",
        accessor: "region_name",
      },
      {
        Header: "Provincia Cup",
        accessor: "province_name",
      },
    ],
    []
  );

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;

      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;

        dispatch({ type: SET_LOADING, payload: true });
        getSurveyData({
          token: keycloak.token,
          ...filter,
          offset: startRow,
          limit: pageSize,
        })
          .then((res: ISearchSurveyData) => {
            dispatch({
              type: SET_RESULTS,
              payload: {
                rows: res.rows,
                pageCount: Math.ceil(res.total / pageSize),
              },
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            dispatch({ type: SET_LOADING, payload: false });
          });
      }
    },
    [filter]
  );

  const handleCloseDelete = () => {
    dispatch({ type: SET_TO_DELETE, payload: null });
  };

  const handleDelete = () => {
    setGlobalLoader(true);
    deleteSurveyData({
      token: keycloak.token,
      id: toDelete.id,
    })
      .then(() => {
        dispatch({ type: SET_TO_DELETE, payload: null });
        fetchData({ pageSize: 10, pageIndex: 0 });
        notify("Questionario eliminato correttamente", "success");
      })
      .catch((err) => {
        notify(err.message, "error");
      })
      .finally(() => {
        setGlobalLoader(false);
      });
  };

  return (
    <React.Fragment>
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
            Sei sicuro di voler eliminare il questionario{" "}
            <strong>{toDelete?.title}</strong> dal Progetto{" "}
            <strong>{toDelete?.cup}</strong>? L'operazione non è reversibile.
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

      <FilterDrawer />
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
        <Typography variant="button">Questionari</Typography>
        <Tooltip title="Filtri">
          <IconButton onClick={() => dispatch({ type: OPEN_FILTER })}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Container maxWidth={false} sx={{ py: 2 }}>
        <ControlledTable
          columns={columns}
          data={rows}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </Container>
    </React.Fragment>
  );
};

export default SurveyDataDashboard;
