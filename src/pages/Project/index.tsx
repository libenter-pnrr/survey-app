import React from "react";

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
import { getProjectData } from "@application/api/Project";
import { ISearchProjectData } from "@application/models/Project/ISearchProjectDataResponse";
import moment from "moment";
import useProjectContext from "@contexts/ProjectContext";
import {
  OPEN_FILTER,
  SET_LOADING,
  SET_RESULTS,
} from "@reducers/Project/actions";
import FilterDrawer from "./FilterDrawer";

const Project = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Codice",
        accessor: "code",
      },
      {
        Header: "Tipologia",
        accessor: "type_description",
      },
      {
        Header: "Cliente",
        accessor: "customer_name",
      },
      {
        Header: "Stato",
        accessor: "cup_status",
      },
      {
        Header: "Regione",
        accessor: "region_name",
      },
      {
        Header: "Provincia",
        accessor: "province_name",
      },
      {
        Header: "Data",
        accessor: "generation_date",
        Cell: ({ value }) => moment(value).format("DD/MM/YYYY"),
      },
    ],
    []
  );
  const { keycloak } = useKeycloak();
  const { loading, rows, pageCount, filter, dispatch } = useProjectContext();

  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;

      dispatch({ type: SET_LOADING, payload: true });
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;

        getProjectData({
          token: keycloak.token,
          ...filter,
          offset: startRow,
          limit: pageSize,
        })
          .then((res: ISearchProjectData) => {
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
        <Typography variant="button">Progetti</Typography>
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

export default Project;
