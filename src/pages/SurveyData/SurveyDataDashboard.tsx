import React from "react";
import { getSurveyData } from "@application/api/SurveyData";
import { ISearchSurveyData } from "@application/models/SurveyData/ISearchSurveyDataResponse";
import { useKeycloak } from "@react-keycloak/web";
import ControlledTable from "@application/components/Table/ControlledTable";
import {
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import {
  OPEN_FILTER,
  SET_LOADING,
  SET_RESULTS,
} from "@reducers/Survey/actions";
import useSuveryDataContext from "@contexts/SurveyDataDashboardProvider";
import FilterDrawer from "./FilterDrawer";
import { MenuIcon } from "@application/components/MenuIcon";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "@contexts/ApplicationProvider";

const SurveyDataDashboard = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const { loading, rows, pageCount, filter, dispatch } = useSuveryDataContext();
  const { username } = useApplicationContext();
  // We'll start our table without any data
  const fetchIdRef = React.useRef(0);

  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        accessor: "id",
        Cell: ({ value, row }) => {
          return (
            <MenuIcon
              options={[
                {
                  label:
                    row.values.created_by === username
                      ? "Modifica"
                      : "Dettagli",
                  onClick: () => {
                    if (row.values.created_by === username) {
                      navigate(`/survey/${value}/update`);
                    } else {
                      navigate(`/survey-data/${value}/details`);
                    }
                  },
                },
                {
                  label: "Elimina",
                  onClick: () => console.log("elimina"),
                },
              ]}
            />
          );
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

  return (
    <React.Fragment>
      <FilterDrawer />
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="button">Questionari</Typography>
        <div>
          <Tooltip title="Filtri">
            <IconButton onClick={() => dispatch({ type: OPEN_FILTER })}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Aggiungi Questionario">
            <IconButton onClick={() => {}}>
              <Add />
            </IconButton>
          </Tooltip>
        </div>
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
